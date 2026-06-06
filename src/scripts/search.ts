// ========================================
// 搜索脚本 — 关键词触发 + 进度追踪 + 停滞检测
// 在 Layout 中加载，所有页面共用
// 搜索行为：跳转到独立搜索页 /search/?q=xxx
// ========================================

// BASE 路径前缀，从 window.__BASE__ 读取（由 Layout head 中 define:vars 脚本注入）
const BASE: string = (window as any).__BASE__ || '/';

// ========================================
// 停滞检测：隐式救援机制
// 如果玩家在短时间内多次搜索但未解开阶段1谜题，
// 下次搜索时在结果页显示"相关搜索"推荐（模拟真实搜索引擎行为）
// ========================================

interface StuckState {
  searchCount: number;
  firstSearchTime: number;
  lastSearchTime: number;
  hintsShown: boolean;
}

function getStuckState(): StuckState {
  const stored = localStorage.getItem('arg_stuck_state');
  if (stored) return JSON.parse(stored);
  return { searchCount: 0, firstSearchTime: 0, lastSearchTime: 0, hintsShown: false };
}

function saveStuckState(state: StuckState): void {
  localStorage.setItem('arg_stuck_state', JSON.stringify(state));
}

function checkStuck(): boolean {
  const progress = JSON.parse(localStorage.getItem('arg_progress') || '{}');
  // 已解开阶段1谜题 → 不需要救援
  if (progress.solvedPuzzles?.shenci_password) return false;

  const state = getStuckState();
  const now = Date.now();

  // 20分钟内搜索5次以上 → 可能卡关
  const withinWindow = now - state.firstSearchTime < 20 * 60 * 1000;
  return withinWindow && state.searchCount >= 5 && !state.hintsShown;
}

function recordSearchAttempt(): void {
  const state = getStuckState();
  const now = Date.now();

  // 重置窗口（超过20分钟重新开始计数）
  if (now - state.firstSearchTime > 20 * 60 * 1000) {
    state.searchCount = 0;
    state.firstSearchTime = now;
    state.hintsShown = false;
  }

  if (state.searchCount === 0) {
    state.firstSearchTime = now;
  }
  state.searchCount++;
  state.lastSearchTime = now;
  saveStuckState(state);
}

// ========================================
// 搜索处理
// ========================================

function handleSearch(query: string): void {
  const trimmed = query.trim();
  if (!trimmed) return;

  recordSearchAttempt();

  // 停滞检测：如果玩家可能卡关，附加标记让搜索页显示相关搜索推荐
  const stuck = checkStuck();
  const stuckParam = stuck ? '&hint=1' : '';

  // 所有搜索 → 跳转到独立搜索页（包含历史存档 + 隐藏页面缓存）
  window.open(`${BASE}search/?q=${encodeURIComponent(trimmed)}${stuckParam}`, '_blank');

  // 标记已显示过提示（避免每次都加）
  if (stuck) {
    const state = getStuckState();
    state.hintsShown = true;
    saveStuckState(state);
  }
}

// 暴露停滞检测函数到全局，供 search.astro 使用
(window as any).__stuckDetection = { getStuckState, checkStuck, recordSearchAttempt };

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // 进度追踪：包裹在 try-catch 中，确保搜索功能不因进度模块异常而失效
  try {
    getProgress();
    recordPageVisit(window.location.pathname);
  } catch (_e) {
    // 进度追踪不可用时静默失败，搜索功能仍可正常使用
  }

  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      handleSearch(searchInput.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSearch(searchInput.value);
      }
    });
  }
});
