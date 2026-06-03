// ========================================
// 搜索脚本 — 关键词触发 + 进度追踪
// 在首页及其他页面中加载
// ========================================

// 关键词 → 隐藏页面映射
const TRIGGER_KEYWORDS: Record<string, string> = {
  '深海裂隙': '/trigger/rift',
  '星门坐标': '/trigger/stargate',
  '布景基地': '/trigger/base',
  '秘境之下': '/member/login',
  '后台管理': '/hidden/admin',
};

// 搜索结果模拟（正常搜索时显示的内容）
const MOCK_RESULTS: Record<string, string[]> = {
  '外星': ['/alien/', '/user/lyu/', '/alien/alien-001/', '/alien/alien-003/'],
  '古迹': ['/ruins/', '/user/shenci/', '/ruins/ruins-001/', '/ruins/ruins-003/'],
  '秘境': ['/ruins/', '/mystery/', '/nature/'],
  '信号': ['/user/lyu/', '/alien/alien-001/', '/alien/alien-006/'],
  '坐标': ['/user/lyu/', '/user/shenci/', '/alien/', '/ruins/'],
  '岩画': ['/ruins/ruins-001/', '/user/shenci/'],
  '神农架': ['/alien/alien-003/', '/ruins/ruins-003/'],
};

// ========================================
// 进度追踪（localStorage）
// ========================================

interface GameProgress {
  discoveredPages: string[];
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
    // 如果访问了隐藏页面，增加标记
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
  const totalDiscoverable = 40; // 总可发现页面数
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

  // 1. 检查关键词触发
  for (const [keyword, url] of Object.entries(TRIGGER_KEYWORDS)) {
    if (trimmed.includes(keyword)) {
      recordPageVisit(url);
      window.open(url, '_blank');
      return;
    }
  }

  // 2. 模拟正常搜索结果
  let found = false;
  for (const [term, pages] of Object.entries(MOCK_RESULTS)) {
    if (trimmed.includes(term)) {
      found = true;
      // 打开第一个匹配的页面
      const firstPage = pages[0];
      recordPageVisit(firstPage);
      window.open(firstPage, '_blank');
      return;
    }
  }

  // 3. 无结果
  if (!found) {
    const hint = document.getElementById('search-hint');
    if (hint) {
      hint.textContent = `未找到与"${trimmed}"相关的结果。请尝试其他关键词。`;
      hint.style.display = 'block';
      setTimeout(() => {
        hint.style.display = 'none';
      }, 5000);
    }
  }
}

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // 确保进度已初始化
  getProgress();

  // 记录当前页面访问
  recordPageVisit(window.location.pathname);

  // 搜索按钮事件
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
