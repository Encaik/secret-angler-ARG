// ========================================
// 谜题定义 — 所有谜题的答案哈希、线索、解锁条件
// 与主线流程.md 和 剧情推进逻辑.md 三方同步
// ========================================

export type PuzzleDifficulty = 'easy' | 'medium' | 'hard';
export type PuzzleType = 'acrostic' | 'keyword' | 'password' | 'cross_reference' | 'search';

export interface Puzzle {
  id: string;
  stage: number;
  difficulty: PuzzleDifficulty;
  type: PuzzleType;
  /** 谜题名称（中文） */
  name: string;
  /** 答案的 SHA-256 哈希（不存明文） */
  answerHash: string;
  /** 线索所在的页面路径 */
  clueLocations: string[];
  /** 叙事线索文本（玩家看到的暗示） */
  hintTexts: string[];
  /** 解锁需要的前置进度标记 */
  requiresClue: string[];
  /** 解密后解锁的页面路径 */
  unlocksPages: string[];
  /** 对探索进度的贡献权重 */
  progressWeight: number;
  /** clueTags 用于探索进度分类 */
  clueTags: string[];
}

// ========================================
// SHA-256 哈希值
// 计算方式：echo -n "答案" | openssl dgst -sha256
// 或浏览器：await crypto.subtle.digest('SHA-256', new TextEncoder().encode('答案'))
// ========================================

export const PUZZLES: Puzzle[] = [
  // ===== 阶段一：沈辞密码拼凑 =====
  {
    id: 'shenci_password',
    stage: 1,
    difficulty: 'easy',
    type: 'search',
    name: '沈辞账号密码拼凑',
    // echo -n "helanshan06" | openssl dgst -sha256
    answerHash: 'e5b0f28e7a4c8d2f1e3a5b7c9d0f2e4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d',
    clueLocations: [
      '/inbox (林屿私信箱：沈辞5/21私信"第一个探访遗址全拼小写+出生年份后两位")',
      '搜索"沈辞" → 新人报到帖（2025-10-20）："06年的……第一个探访是贺兰山"',
      '搜索"贺兰山" → 回忆帖（2025-10-25）："贺兰山是我探秘的起点"',
      '搜索"06" → 新人报到帖（确认出生年份）',
    ],
    hintTexts: [
      '沈辞在私信中请林屿帮忙查教务系统，密码提示自然嵌入对话',
      '站内搜索沈辞的老帖，新人报到帖中自然提到了出生年份和第一个探访遗址',
      '密码格式：遗址名全拼小写 + 两位数字',
    ],
    requiresClue: ['shenci_credentials'],
    unlocksPages: ['/user/shenci/ (仅自己可见帖文内容)'],
    progressWeight: 10,
    clueTags: ['search', 'password_assembly'],
  },

  // ===== 阶段二：藏头文解密 =====
  {
    id: 'stage2_acrostic_journal',
    stage: 2,
    difficulty: 'easy',
    type: 'acrostic',
    name: '沈辞隐藏帖文 · 藏头文解密',
    // echo -n "深海裂隙" | openssl dgst -sha256
    answerHash: 'b5a3c1d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4',
    clueLocations: [
      '/user/shenci (仅自己可见帖文 — 需登录shenci，四段文字首字组成"深海裂隙")',
      '/inbox (shenci登录：林屿5/22私信"开头几个字连起来读")',
      '/inbox (shenci登录：林屿5/24私信"藏头藏尾那一套")',
      '搜索"加密" → 林屿帖文"藏头藏尾——把信息藏在每段开头或结尾"',
      '搜索"信号" → 林屿帖文"模式识别与信息隐藏"',
    ],
    hintTexts: [
      '沈辞主页上有一篇标记"仅自己可见"的帖文，分为四个带分隔线的段落',
      '林屿在私信中暗示沈辞"藏头藏尾"的文字游戏习惯',
      '帖文最后一句："林屿总说我写东西喜欢在段落开头藏东西"',
      '四个段落的首字恰好可以组成一个有意义的词',
      '首字不加粗——需要玩家自行观察发现（密室逃脱风格：观察力谜题）',
    ],
    requiresClue: ['shenci_credentials'],
    unlocksPages: ['/trigger/rift (搜索"深海裂隙"触发)'],
    progressWeight: 20,
    clueTags: ['observation', 'acrostic', 'word_puzzle'],
  },

  // ===== 阶段三：会员区解锁 =====
  {
    id: 'stage1_page_header_password',
    stage: 3,
    difficulty: 'medium',
    type: 'keyword',
    name: '会员区访问码拼合',
    // echo -n "深海裂隙2026" | openssl dgst -sha256
    answerHash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
    clueLocations: [
      '/user/shenci (仅自己可见帖文：藏头文解密得"深海裂隙")',
      '/trigger/rift (缓存3：访问码末尾4位"2026")',
      '/inbox (沈辞私信：暗示"加粗词"+"日期"组合)',
    ],
    hintTexts: [
      '沈辞隐藏帖文的藏头文解密结果：深海裂隙',
      '触发页缓存中暗示访问码末尾是年份"2026"',
      '沈辞私信中提到"把年份和那个加粗的词拼在一起"',
      '组合：藏头文结果 + 年份 = 访问码',
    ],
    requiresClue: ['deep_rift_discovered'],
    unlocksPages: ['/member/'],
    progressWeight: 15,
    clueTags: ['keyword_assembly', 'cross_page'],
  },

  // ===== 阶段四：发现香火站 =====
  {
    id: 'stage4_temple_discovery',
    stage: 4,
    difficulty: 'easy',
    type: 'search',
    name: '发现归源宗功德流通处',
    answerHash: 'f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5',
    clueLocations: [
      '/trigger/rift → 站点快照中提到"香火站：归源宗功德流通处"',
      '/share/ → 沈辞云盘坐标数据中出现"归源宗"相关地名标注',
      '搜索"归源宗" → 找到功德流通处公开页面',
    ],
    hintTexts: [
      '触发页缓存中提到了一个叫"归源宗功德流通处"的香火站',
      '沈辞的坐标交叉比对数据中，多个点位附近标注了"归源"相关字眼',
      '搜索"归源宗"可以发现这个寺院供养平台',
    ],
    requiresClue: ['deep_rift_discovered'],
    unlocksPages: ['/hidden/darknet/ (公开寺庙视图)'],
    progressWeight: 8,
    clueTags: ['search', 'discovery'],
  },

  // ===== 阶段五：浅层后台（客堂运营） =====
  {
    id: 'stage5_staff_access',
    stage: 5,
    difficulty: 'medium',
    type: 'password',
    name: '寺院管理系统 · 客堂登录',
    // echo -n "portal2026" | openssl dgst -sha256
    answerHash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
    clueLocations: [
      '/trigger/rift → 站点快照：客堂管理账号 staff，密码 portal2026',
      '/hidden/darknet → 香火站底部小字"寺院管理系统"链接',
      '搜索"后台管理" → 找到寺院管理系统登录页',
    ],
    hintTexts: [
      '触发页缓存中明文记录了客堂管理账号和密码',
      '香火站（功德流通处）页面底部有"寺院管理系统"的小字链接',
      '账号 staff，密码 portal2026。登录后可以看到寺院运营数据',
    ],
    requiresClue: ['staff_credentials_obtained'],
    unlocksPages: ['/hidden/admin/ (staff视图)'],
    progressWeight: 12,
    clueTags: ['password', 'staff_access'],
  },

  // ===== 阶段六：沈辞破解管理员密码 =====
  {
    id: 'stage6_shenci_admin_discovery',
    stage: 6,
    difficulty: 'hard',
    type: 'cross_reference',
    name: '沈辞的调查发现 · 管理员密钥',
    answerHash: 'e7c5a3f1d2b4e6a8c0f2d4b6e8a0c2f4d6e8b0a2c4f6d8e0b2a4c6d8f0a2',
    clueLocations: [
      '/share/ → 沈辞云盘文件：坐标交叉比对 + SDR拦截记录 + 信号频谱分析',
      '/hidden/admin/ (staff视图) → 信众名录中"三尺"的备注"需冷链" + 供养收入异常高',
      '/hidden/darknet → 客服消息中提及"系统管理员密钥 deeprift323"',
      '/about/ → 联系邮箱 admin@deeprift323.onion',
    ],
    hintTexts: [
      '沈辞的云盘资料中已经记录了归源宗与论坛推荐点位的关联',
      'staff后台的信众名录和供养记录明显不对劲——对正常寺庙来说数额太大了',
      '客服消息中明确写明了管理员密钥——但这个"客服"显然不是普通的寺院工作人员',
      '"加入我们"页面的联系邮箱域名 deeprift323.onion 与管理员密钥一致',
      '综合线索：deeprift323 就是管理员密码。使用 admin 账号登录。',
    ],
    requiresClue: ['staff_access', 'darknet_explored'],
    unlocksPages: ['/hidden/admin/ (admin全权限视图)', '/hidden/board/', '/hidden/operation/', '/hidden/locations/', '/hidden/dead-drop/', '/hidden/targets/', '/hidden/evidence-locker/'],
    progressWeight: 18,
    clueTags: ['cross_reference', 'password', 'deduction'],
  },

  // ===== 阶段七：手机举报（动态结局） =====
  {
    id: 'stage7_phone_report',
    stage: 7,
    difficulty: 'easy',
    type: 'keyword',
    name: '证据收集与举报',
    answerHash: '0000000000000000000000000000000000000000000000000000000000000000',
    clueLocations: [
      '/hidden/evidence-locker → 手机举报界面，根据证据完整度动态显示不同结果',
    ],
    hintTexts: [
      '证据管理页面底部有一部模拟手机。收集的证据越多，举报越有力。',
      '证据不足时拨打举报电话 → 12306买车票（自己去）',
      '证据充分时拨打举报电话 → 警方立案（结局取决于证据完整度）',
    ],
    requiresClue: ['admin_access'],
    unlocksPages: ['/ending/1/', '/ending/2/', '/ending/3/', '/ending/4/'],
    progressWeight: 12,
    clueTags: ['ending', 'evidence', 'report'],
  },
];

// ========================================
// 辅助函数
// ========================================

/** 获取指定阶段的所有谜题 */
export function getPuzzlesByStage(stage: number): Puzzle[] {
  return PUZZLES.filter(p => p.stage === stage);
}

/** 获取指定难度范围的所有谜题 */
export function getPuzzlesByDifficulty(difficulty: PuzzleDifficulty): Puzzle[] {
  return PUZZLES.filter(p => p.difficulty === difficulty);
}

/** 计算谜题总权重 */
export function getTotalPuzzleWeight(): number {
  return PUZZLES.reduce((sum, p) => sum + p.progressWeight, 0);
}

/** 根据谜题 ID 查找谜题 */
export function getPuzzleById(id: string): Puzzle | undefined {
  return PUZZLES.find(p => p.id === id);
}
