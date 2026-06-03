// ========================================
// 谜题定义 — 所有谜题的答案哈希、线索、解锁条件
// ========================================

export type PuzzleDifficulty = 'easy' | 'medium' | 'hard';
export type PuzzleType = 'base64' | 'caesar' | 'keyword' | 'stegano' | 'coordinate' | 'password';

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
    // echo -n "秘境探秘2024" | openssl dgst -sha256
    answerHash: '3f8c2e1a9b7d5f4e6c8a0b2d4f6e8a0c2e4f6a8b0d2c4e6f8a0b2d4f6e8a',
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
    id: 'stage2_base64_source_comment',
    stage: 2,
    difficulty: 'medium',
    type: 'base64',
    name: '源码 Base64 解码',
    // 在 HTML 源码注释中嵌入 Base64 编码的线索
    answerHash: 'placeholder_stage2_base64',
    clueLocations: [
      '/user/shenci (HTML源码注释)',
      '/community/post/shenci-log-003 (正文暗示"留白处藏通路")',
    ],
    hintTexts: [
      '沈辞在一篇文章中写道："有些真相藏在留白处，需要换一个角度才能看见"',
      '浏览器的"查看源代码"功能或许能揭示更多信息',
    ],
    requiresPuzzle: ['stage1_page_header_password'],
    unlocksPages: [],
    progressWeight: 10,
    clueTags: ['source_code', 'base64'],
  },
  {
    id: 'stage2_caesar_cipher',
    stage: 2,
    difficulty: 'medium',
    type: 'caesar',
    name: '凯撒密码解码',
    // Base64解码后获得的文本是凯撒密码加密的
    answerHash: 'placeholder_stage2_caesar',
    clueLocations: [
      'Base64解码结果',
      '/user/linyu (一篇文章中提到凯撒密码)',
    ],
    hintTexts: [
      '解码后的文字看起来像乱码，但字母的排列似乎有规律',
      '林屿在某篇外星信号分析文章中提到了"移位加密"',
    ],
    requiresPuzzle: ['stage2_base64_source_comment'],
    unlocksPages: ['/trigger/rift'],
    progressWeight: 10,
    clueTags: ['caesar', 'cipher'],
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
      '凯撒密码解码结果（获得关键词）',
      '/member/dashboard (页脚隐藏字符)',
    ],
    hintTexts: [
      '解码后的关键词指向一个不存在的页面路径',
      '尝试在站内搜索这个关键词会怎样？',
    ],
    requiresPuzzle: ['stage2_caesar_cipher'],
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
