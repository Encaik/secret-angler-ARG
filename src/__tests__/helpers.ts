// ========================================
// 测试辅助工具 — 进度状态工厂函数
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

/** 创建空白进度 */
export function createEmptyProgress(overrides?: Partial<GameProgress>): GameProgress {
  return {
    discoveredPages: [],
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
    ...overrides,
  };
}

/** 将进度写入 localStorage */
export function seedProgress(progress: GameProgress): void {
  localStorage.setItem('arg_progress', JSON.stringify(progress));
}

/** 清除 localStorage 进度 */
export function clearProgress(): void {
  localStorage.removeItem('arg_progress');
}

/** 从 localStorage 读取当前进度 */
export function readProgress(): GameProgress {
  const stored = localStorage.getItem('arg_progress');
  if (!stored) throw new Error('No progress in localStorage');
  return JSON.parse(stored);
}

// ========================================
// 各阶段进度工厂
// ========================================

/** 阶段1：序幕完成 — 已访问 prologue + post/247 + 未登录 */
export function makeStage1Progress(): GameProgress {
  return createEmptyProgress({
    discoveredPages: ['/', '/community/post/247/', '/login/'],
    discoveredClues: [],
    explorationProgress: 5,
    currentStage: 1,
  });
}

/** 阶段1.5：已登录 lyu — 可读私信箱 */
export function makeLyuLoggedInProgress(): GameProgress {
  return createEmptyProgress({
    discoveredPages: ['/', '/community/post/247/', '/login/', '/home/'],
    discoveredClues: ['login_lyu'],
    explorationProgress: 8,
    currentStage: 1,
  });
}

/** 阶段2：已登录 shenci — 可看隐藏帖文 */
export function makeShenciLoggedInProgress(): GameProgress {
  return createEmptyProgress({
    discoveredPages: ['/', '/community/post/247/', '/login/', '/user/center/lyu/', '/inbox/lyu/', '/user/center/shenci/'],
    discoveredClues: ['login_lyu', 'login_shenci', 'shenci_credentials'],
    solvedPuzzles: {
      shenci_password: true,
    },
    explorationProgress: 25,
    currentStage: 2,
  });
}

/** 阶段3：藏头文已破解，深海裂隙已发现 */
export function makeStage3Progress(): GameProgress {
  return createEmptyProgress({
    discoveredPages: [
      '/', '/community/post/247/', '/login/', '/user/center/lyu/',
      '/inbox/lyu/', '/user/center/shenci/', '/user/shenci/', '/trigger/rift/',
    ],
    discoveredClues: ['login_lyu', 'login_shenci', 'shenci_credentials'],
    solvedPuzzles: {
      shenci_password: true,
      stage2_acrostic_journal: true,
    },
    explorationProgress: 35,
    currentStage: 3,
  });
}

/** 阶段4：会员区已解锁，已访问触发页 */
export function makeStage4Progress(): GameProgress {
  return createEmptyProgress({
    discoveredPages: [
      '/', '/community/post/247/', '/login/', '/user/center/lyu/',
      '/inbox/lyu/', '/user/center/shenci/', '/user/shenci/',
      '/trigger/rift/', '/trigger/stargate/', '/trigger/base/', '/member/',
    ],
    discoveredClues: ['login_lyu', 'login_shenci', 'shenci_credentials'],
    solvedPuzzles: {
      shenci_password: true,
      stage2_acrostic_journal: true,
      stage1_page_header_password: true,
    },
    explorationProgress: 50,
    currentStage: 4,
  });
}

/** 阶段5：暗网已登录 */
export function makeStage5Progress(): GameProgress {
  return createEmptyProgress({
    discoveredPages: [
      '/', '/community/post/247/', '/login/', '/user/center/lyu/',
      '/inbox/lyu/', '/user/center/shenci/', '/user/shenci/',
      '/trigger/rift/', '/trigger/stargate/', '/trigger/base/', '/member/',
      '/hidden/panlongxia/', '/about/',
    ],
    discoveredClues: ['login_lyu', 'login_shenci', 'shenci_credentials', 'darknet_account_claimed'],
    solvedPuzzles: {
      shenci_password: true,
      stage2_acrostic_journal: true,
      stage1_page_header_password: true,
      stage4_darknet_access: true,
    },
    explorationProgress: 65,
    currentStage: 5,
  });
}

/** 阶段6：admin 已登录，已访问全部隐藏页面 */
export function makeStage6Progress(): GameProgress {
  return createEmptyProgress({
    discoveredPages: [
      '/', '/community/post/247/', '/login/', '/user/center/lyu/',
      '/inbox/lyu/', '/user/center/shenci/', '/user/shenci/',
      '/trigger/rift/', '/trigger/stargate/', '/trigger/base/', '/member/',
      '/hidden/panlongxia/', '/about/', '/hidden/admin/',
      '/hidden/board/', '/hidden/operation/', '/hidden/locations/',
      '/hidden/dead-drop/', '/hidden/targets/', '/hidden/evidence-locker/',
    ],
    discoveredClues: [
      'login_lyu', 'login_shenci', 'shenci_credentials',
      'darknet_account_claimed', 'admin_access',
    ],
    solvedPuzzles: {
      shenci_password: true,
      stage2_acrostic_journal: true,
      stage1_page_header_password: true,
      stage4_darknet_access: true,
      stage3_hidden_admin_password: true,
    },
    explorationProgress: 90,
    currentStage: 6,
  });
}
