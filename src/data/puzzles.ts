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
    id: 'stage2_base64_source_comment',
    stage: 2,
    difficulty: 'medium',
    type: 'base64',
    name: '私密草稿 Base64 解码',
    // echo -n "vkliw ydoxh lv wkuhh nhbzrug lv ghhs uliw" | openssl dgst -sha256
    answerHash: '011c7a31dbe5fa24513f4fbee44147171dbba153399ac99ef37ca5379011bbdd',
    clueLocations: [
      '/user/shenci (私密草稿 — 需登录shenci账号，草稿中含Base64密文)',
      '/inbox (沈辞私信箱中林屿的留言 — 需登录shenci账号，暗示沈辞藏了加密信息)',
      '搜索"加密" → 林屿历史帖文关于Base64和凯撒密码的讨论',
      '搜索"信号" → 林屿早期帖文提到移位加密',
    ],
    hintTexts: [
      '沈辞的私密草稿中展示了一串绿色乱码字符，旁边写道："外层是一层很常见的编码方式——计算机之间传数据经常用的那种"',
      '林屿在给沈辞的私信中暗示沈辞"把东西藏在奇怪的地方"',
      '在站内搜索"加密"，可以找到林屿早期关于Base64和凯撒密码的讨论帖',
      '私密草稿中沈辞提到"什么事都绕不过三"——暗示位移值为3',
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
    // echo -n "shift value is three keyword is deep rift" | openssl dgst -sha256
    answerHash: '8e111fd5bfb53cb5c0977ec4315e69e70a4cc39dbf23be6b284d38400d8c7bb7',
    clueLocations: [
      'Base64解码结果（vkliw ydoxh lv wkuhh nhbzrug lv ghhs uliw）',
      '/user/shenci (私密草稿提到"什么事都绕不过三"——暗示位移值=3)',
      '搜索"加密" → 历史帖文中讨论凯撒移位原理',
    ],
    hintTexts: [
      'Base64解码后的文字看起来像乱码，但每个字母似乎都偏移了相同的位置',
      '沈辞的私密草稿中提到"什么事都绕不过三"，暗示移位值为3',
      '在站内搜索"加密"可以找到关于凯撒移位的历史讨论',
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
