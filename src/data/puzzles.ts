// ========================================
// 谜题定义 — 所有谜题的答案哈希、线索、解锁条件
// ========================================

export type PuzzleDifficulty = 'easy' | 'medium' | 'hard';
export type PuzzleType = 'acrostic' | 'keyword' | 'stegano' | 'coordinate' | 'password';

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
  /** 解锁需要的前置谜题 ID */
  requiresPuzzle: string[];
  /** 解密后解锁的页面路径 */
  unlocksPages: string[];
  /** 对探索进度的贡献权重 */
  progressWeight: number;
  /** clueTags 用于探索进度分类 */
  clueTags: string[];
}

// ========================================
// 辅助函数：SHA-256 哈希
// 实际使用时需要 crypto.subtle.digest
// 这里预计算好各答案的哈希值
// ========================================

/**
 * 在线计算答案的 SHA-256 哈希
 * 开发时使用：echo -n "答案" | openssl dgst -sha256
 * 或浏览器 console：await crypto.subtle.digest('SHA-256', new TextEncoder().encode('答案'))
 *    .then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join(''))
 */

export const PUZZLES: Puzzle[] = [
  // ===== 阶段一：初级谜题 =====
  {
    id: 'stage1_page_header_password',
    stage: 1,
    difficulty: 'easy',
    type: 'password',
    name: '会员区入口密码',
    // echo -n "秘境探秘2026" | openssl dgst -sha256
    answerHash: 'e4a37c0c8ba9d736644d444510716106f854d427a73b911fb94d72e73846e8c9',
    clueLocations: [
      '/user/shenci (文章页眉微缩文字)',
      '/community/post/shenci-log-001 (正文暗示)',
    ],
    hintTexts: [
      '沈辞某篇文章的标题下方有一行极小的文字，似乎是一个日期和短语的组合',
      '沈辞在社区发帖时说："每次探秘回来，我都会用一个固定格式命名我的发现笔记"',
    ],
    requiresPuzzle: [],
    unlocksPages: ['/member/'],
    progressWeight: 15,
    clueTags: ['observation', 'hidden_text'],
  },

  // ===== 阶段二：中级谜题 =====
  {
    id: 'stage2_acrostic_journal',
    stage: 2,
    difficulty: 'easy',
    type: 'acrostic',
    name: '沈辞隐藏帖文 · 藏头文解密',
    // echo -n "深海裂隙" | openssl dgst -sha256
    answerHash: 'c2e5f1a3b4d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    clueLocations: [
      '/user/shenci (仅自己可见帖文 — 需登录shenci账号，四段文字首字组成关键词)',
      '/inbox (沈辞私信箱中林屿的留言 — 需登录shenci账号，提示"开头几个字连起来读")',
      '/inbox (沈辞私信箱中林屿的留言 — 提示"藏头藏尾"暗示藏头文形式)',
      '搜索"加密" → 林屿历史帖文关于藏头藏尾信息隐藏的讨论',
    ],
    hintTexts: [
      '沈辞的主页上有一篇标记为"仅自己可见"的帖文，分为四个带分隔线的段落',
      '林屿在给沈辞的私信中暗示沈辞"藏头藏尾地玩文字游戏"',
      '林屿私信中写道："开头几个字连起来读"——暗示关注每段首字',
      '帖文最后一句："林屿总说我写东西喜欢在开头藏线索"',
      '帖文中四个段落的开头字符恰好可以组成一个有意义的词',
    ],
    requiresPuzzle: ['stage1_page_header_password'],
    unlocksPages: ['/trigger/rift'],
    progressWeight: 20,
    clueTags: ['observation', 'acrostic', 'word_puzzle'],
  },

  // ===== 阶段三：高级谜题 =====
  {
    id: 'stage3_keyword_trigger',
    stage: 3,
    difficulty: 'medium',
    type: 'keyword',
    name: '关键词触发隐藏页',
    // 搜索框输入特定关键词 → 跳转隐藏页面
    answerHash: 'placeholder_stage3_keyword',
    clueLocations: [
      '藏头文解密结果（获得关键词"深海裂隙"）',
      '/member/dashboard (页脚隐藏字符)',
    ],
    hintTexts: [
      '从沈辞隐藏帖文中提取的关键词指向某个深层内容',
      '尝试在站内搜索这个关键词会怎样？',
    ],
    requiresPuzzle: ['stage2_acrostic_journal'],
    unlocksPages: ['/trigger/rift', '/trigger/stargate', '/trigger/base'],
    progressWeight: 10,
    clueTags: ['keyword', 'search'],
  },
  {
    id: 'stage3_hidden_admin_password',
    stage: 3,
    difficulty: 'hard',
    type: 'password',
    name: '后台系统登录密码',
    answerHash: 'placeholder_stage3_admin',
    clueLocations: [
      '/member/profile/leaker-07 (泄密会员留言)',
      '/trigger/base (布景基地描述)',
    ],
    hintTexts: [
      '泄密会员的留言中暗示了"系统管理员"的密码规则',
      '布景基地的某段描述中包含了一组看似无关的数字和字母',
    ],
    requiresPuzzle: ['stage3_keyword_trigger'],
    unlocksPages: ['/hidden/board', '/hidden/operation', '/hidden/locations'],
    progressWeight: 15,
    clueTags: ['password', 'hidden_admin'],
  },

  // ===== 阶段四：终极谜题 =====
  {
    id: 'stage4_stegano_image',
    stage: 4,
    difficulty: 'hard',
    type: 'stegano',
    name: '图片隐写解码',
    // 关于我们页面的图片使用 LSB 隐写
    answerHash: 'placeholder_stage4_stegano',
    clueLocations: [
      '/about (隐写图片)',
      '/hidden/dead-drop (暗示"图中藏图")',
    ],
    hintTexts: [
      '关于我们页面有一张"团队合影"，但放大后有些像素看起来不太对',
      '叛变成员的留言中写道："他们喜欢把秘密藏在最显眼的地方"',
    ],
    requiresPuzzle: ['stage3_hidden_admin_password'],
    unlocksPages: ['/hidden/evidence-locker'],
    progressWeight: 10,
    clueTags: ['steganography', 'image'],
  },
  {
    id: 'stage4_encrypted_zip',
    stage: 4,
    difficulty: 'hard',
    type: 'password',
    name: '加密压缩包解压',
    // 沈辞主页可下载的 ZIP 文件
    answerHash: 'placeholder_stage4_zip',
    clueLocations: [
      '/user/shenci (下载链接)',
      '图片隐写解码结果（ZIP密码）',
    ],
    hintTexts: [
      '沈辞的主页上有一个"探秘资料包"的下载链接，但需要解压密码',
      '隐写图片中提取的文字似乎是一个密码',
    ],
    requiresPuzzle: ['stage4_stegano_image'],
    unlocksPages: [],
    progressWeight: 10,
    clueTags: ['zip', 'download'],
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
