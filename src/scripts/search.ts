// ========================================
// 搜索脚本 — 关键词触发 + 进度追踪
// 在 Layout 中加载，所有页面共用
// 搜索行为：跳转到独立搜索页 /search/?q=xxx
// ========================================

// BASE 路径前缀，从 window.__BASE__ 读取（由 Layout head 中 define:vars 脚本注入）
const BASE: string = (window as any).__BASE__ || '/';

// 关键词 → 隐藏页面（直接跳转，不经过搜索页）
const TRIGGER_KEYWORDS: Record<string, string> = {
  '深海裂隙': BASE + 'trigger/rift',
  '星门坐标': BASE + 'trigger/stargate',
  '布景基地': BASE + 'trigger/base',
  '秘境之下': BASE + 'member/login',
  '后台管理': BASE + 'hidden/admin',
  '深度探秘': BASE + 'hidden/darknet',
};

// ========================================
// 进度追踪（localStorage）
// ========================================

interface GameProgress {
  discoveredPages: string[];
  discoveredClues: string[];
  solvedPuzzles: Record<string, boolean>;
  explorationProgress: number;
  currentStage: number;
  hasFullEvidence: boolean;
  hasAlertedPolice: boolean;
  hasRescuedRoommate: boolean;
  playerTargeted: boolean;
  ending: string | null;
  startedAt: number;
}

function getProgress(): GameProgress {
  const stored = localStorage.getItem('arg_progress');
  if (stored) {
    return JSON.parse(stored);
  }
  const initial: GameProgress = {
    discoveredPages: [window.location.pathname],
    discoveredClues: [],
    solvedPuzzles: {},
    explorationProgress: 0,
    currentStage: 1,
    hasFullEvidence: false,
    hasAlertedPolice: false,
    hasRescuedRoommate: false,
    playerTargeted: false,
    ending: null,
    startedAt: Date.now(),
  };
  saveProgress(initial);
  return initial;
}

function saveProgress(progress: GameProgress): void {
  localStorage.setItem('arg_progress', JSON.stringify(progress));
}

function recordPageVisit(url: string): void {
  const progress = getProgress();
  if (!progress.discoveredPages.includes(url)) {
    progress.discoveredPages.push(url);
    if (url.includes('/hidden/') || url.includes('/trigger/')) {
      if (progress.discoveredPages.filter(p => p.includes('/hidden/') || p.includes('/trigger/')).length >= 4) {
        progress.playerTargeted = true;
      }
    }
    updateExplorationProgress(progress);
    saveProgress(progress);
  }
}

function updateExplorationProgress(progress: GameProgress): void {
  const totalDiscoverable = 40;
  const hiddenBonus = progress.discoveredPages.filter(
    p => p.includes('/hidden/') || p.includes('/trigger/') || p.includes('/member/')
  ).length * 2;
  const puzzleBonus = Object.values(progress.solvedPuzzles).filter(Boolean).length * 5;

  progress.explorationProgress = Math.min(
    100,
    Math.round((progress.discoveredPages.length / totalDiscoverable) * 60 + hiddenBonus + puzzleBonus)
  );
}

// ========================================
// 搜索处理
// ========================================

function handleSearch(query: string): void {
  const trimmed = query.trim();
  if (!trimmed) return;

  const progress = getProgress();

  // 1. 谜题答案检查（"秘境探秘2026"）→ 直接解锁会员区
  if (trimmed === '秘境探秘2026') {
    const p = JSON.parse(localStorage.getItem('arg_progress') || '{}');
    if (!p.solvedPuzzles) p.solvedPuzzles = {};
    p.solvedPuzzles['stage1_page_header_password'] = true;
    if (!p.discoveredClues) p.discoveredClues = [];
    if (!p.discoveredClues.includes('member_access')) {
      p.discoveredClues.push('member_access');
      p.explorationProgress = (p.explorationProgress || 0) + 15;
    }
    localStorage.setItem('arg_progress', JSON.stringify(p));
    recordPageVisit('/member/');
    window.open(BASE + 'member/', '_blank');
    return;
  }

  // 2. 触发关键词 → 直接跳转隐藏页面
  for (const [keyword, url] of Object.entries(TRIGGER_KEYWORDS)) {
    if (trimmed.includes(keyword)) {
      recordPageVisit(url);
      // 追踪暗网入口发现
      if (keyword === '深度探秘') {
        const p = JSON.parse(localStorage.getItem('arg_progress') || '{}');
        if (!p.discoveredClues) p.discoveredClues = [];
        if (!p.discoveredClues.includes('darknet_entrance_found')) {
          p.discoveredClues.push('darknet_entrance_found');
          p.explorationProgress = (p.explorationProgress || 0) + 5;
          localStorage.setItem('arg_progress', JSON.stringify(p));
        }
      }
      window.open(url, '_blank');
      return;
    }
  }

  // 3. 其余所有搜索 → 跳转到独立搜索页
  window.open(`${BASE}search/?q=${encodeURIComponent(trimmed)}`, '_blank');
}

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  getProgress();
  recordPageVisit(window.location.pathname);

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
