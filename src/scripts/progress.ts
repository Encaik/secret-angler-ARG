// ========================================
// 进度追踪（localStorage）— 从 search.ts 提取
// 所有页面通过 Layout/HiddenLayout 加载 search.ts 间接使用
// 提取为独立模块以便测试
// ========================================

export interface GameProgress {
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

export function getProgress(): GameProgress {
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

export function saveProgress(progress: GameProgress): void {
  localStorage.setItem('arg_progress', JSON.stringify(progress));
}

export function recordPageVisit(url: string): void {
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

export function updateExplorationProgress(progress: GameProgress): void {
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
