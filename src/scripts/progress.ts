// ========================================
// 进度追踪（localStorage）— 从 search.ts 提取
// 所有页面通过 Layout/HiddenLayout 加载 search.ts 间接使用
// 提取为独立模块以便测试
// ========================================

// 注意：此文件不使用 export 关键词。
// 原因：该文件通过 Layout.astro 中的 <script src="..."> 加载，
// Astro/Vite 会将多个脚本 hoist 到同一个 bundle 中。
// 如果使用 export，Rollup 会将其视为 ES 模块并 tree-shaking 掉
// 未被其他模块 import 的函数，导致 search.ts 中的调用抛出 ReferenceError。
// 函数通过 window 对象暴露，供测试文件访问。

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

// 挂载到 window 供测试文件和跨模块访问
if (typeof window !== 'undefined') {
  (window as any).getProgress = getProgress;
  (window as any).saveProgress = saveProgress;
  (window as any).recordPageVisit = recordPageVisit;
  (window as any).updateExplorationProgress = updateExplorationProgress;
}
