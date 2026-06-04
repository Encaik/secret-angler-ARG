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

  // ===== 阶段四：暗网邀请凭证三源交叉验证 =====
  {
    id: 'stage4_darknet_invite',
    stage: 4,
    difficulty: 'hard',
    type: 'cross_reference',
    name: '暗网邀请凭证 · 三源交叉验证',
    answerHash: 'd7c5e3a1f2b4d6e8c0a2f4b6d8e0a2c4e6f8a0b2c4d6e8f0a2b4c6d8e0',
    clueLocations: [
      '/member/ → SDR扫频拦截记录：完整号码 17093280045 + "新客待激活"',
      '/trigger/rift → 缓存2：6/1内部通讯"新客户未激活……号码已从缓存中清除"',
      '/inbox → 沈辞5/21私信"招募页你去看了没……联系电话那一栏"',
      '/about/ → 联系电话栏：填入17093280045 → 弹窗暗网账号',
    ],
    hintTexts: [
      '线索A（会员区）：林屿SDR拦截到17093280045——完整的11位号码',
      '线索B（触发页）：确认"新客户未激活"——但号码被搜索引擎清除',
      '线索C（私信箱）：沈辞暗示操作位置——"加入我们"的"联系电话"栏',
      '三条线索交叉：A给号码 + B确认可用 + C给位置 → 填入号码即可获取暗网账号',
    ],
    requiresClue: ['darknet_invite_obtained'],
    unlocksPages: ['/hidden/darknet/ (需先通过弹窗获取账号)'],
    progressWeight: 20,
    clueTags: ['cross_reference', 'deduction', 'invite_code'],
  },

  // ===== 阶段五：后台管理密码 =====
  {
    id: 'stage3_hidden_admin_password',
    stage: 5,
    difficulty: 'medium',
    type: 'password',
    name: '后台管理系统认证',
    // echo -n "deeprift323" | openssl dgst -sha256
    answerHash: 'e7c5a3f1d2b4e6a8c0f2d4b6e8a0c2f4d6e8b0a2c4f6d8e0b2a4c6d8f0a2',
    clueLocations: [
      '/about/ → 联系邮箱 admin@deeprift323.onion',
      '/trigger/rift → 内部域名 deeprift323.onion',
    ],
    hintTexts: [
      '"加入我们"页面的联系邮箱域名是 deeprift323.onion',
      '触发页中出现的内部域名也包含 "deeprift323"',
      '去掉.onion后缀：deeprift323 即为管理后台认证密钥',
    ],
    requiresClue: ['stage1_page_header_password'],
    unlocksPages: ['/hidden/admin/', '/hidden/board/', '/hidden/operation/', '/hidden/locations/', '/hidden/dead-drop/', '/hidden/targets/', '/hidden/evidence-locker/'],
    progressWeight: 15,
    clueTags: ['password', 'domain_hint'],
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
