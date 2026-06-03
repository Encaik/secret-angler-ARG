// ========================================
// 搜索系统共享数据 — 历史存档内容 & 关键词映射
// 由 search.ts（客户端跳转）和 search.astro（结果页）共同使用
// ========================================

export interface ArchivedPost {
  title: string;
  author: string;
  authorUrl: string;
  date: string;
  content: string;
  /** 是否为关键线索（高亮显示） */
  isClue: boolean;
}

// 关键词 → 隐藏页面映射（触发跳转）
export const TRIGGER_KEYWORDS: Record<string, string> = {
  '深海裂隙': '/trigger/rift',
  '星门坐标': '/trigger/stargate',
  '布景基地': '/trigger/base',
  '秘境之下': '/member/login',
  '后台管理': '/hidden/admin',
};

// 历史存档内容（仅通过搜索关键词可见）
// 模拟"沉底的老帖"，不在任何页面上直接显示
export const ARCHIVED_CONTENT: Record<string, ArchivedPost[]> = {
  // ---- 沈辞相关历史内容 ----
  // "shenci" 与 "沈辞" 指向同一人的历史帖文（玩家通过私信箱线索得知账号名 shenci）
  'shenci': [
    {
      title: '新人报到帖',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-10-20',
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是历史学。对冷门古迹特别感兴趣，喜欢往没人的地方跑。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>——一个人背着帐篷在岩画前坐了一下午。从那以后就停不下来了。希望在这里能找到同好。',
      isClue: true,
    },
    {
      title: '回忆帖：我的入门探秘——贺兰山',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-10-25',
      content: '翻了翻手机相册，看到大一国庆在<strong>贺兰山</strong>拍的照片。那时候装备简陋得不行——一个书包、一瓶水、手机导航。但那一天在岩画前坐了整整一个下午，看着那些几千年前的人留下的凿痕，突然就明白自己想做什么了。可以说<strong>贺兰山是我探秘的起点</strong>，从那之后每次出行都是这个感觉的延续。',
      isClue: true,
    },
    {
      title: '分享：贺兰山岩画探访简易攻略',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-11-08',
      content: '上个月又去了一趟贺兰山，把主崖面和两条侧沟的岩画群都走了一遍。整理了一份简易攻略给想去的人。贺兰山的岩画以凿刻为主，跟南方彩绘风格完全不同。',
      isClue: false,
    },
  ],
  '沈辞': [
    {
      title: '新人报到帖',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-10-20',
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是历史学。对冷门古迹特别感兴趣，喜欢往没人的地方跑。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>——一个人背着帐篷在岩画前坐了一下午。从那以后就停不下来了。希望在这里能找到同好。',
      isClue: true,
    },
    {
      title: '分享：贺兰山岩画探访简易攻略',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-11-08',
      content: '上个月又去了一趟贺兰山，把主崖面和两条侧沟的岩画群都走了一遍。整理了一份简易攻略给想去的人。贺兰山的岩画以凿刻为主，跟南方彩绘风格完全不同。这次重点看了<strong>之前没走完的东侧崖壁</strong>，发现了好几组之前没人记录过的图案。',
      isClue: false,
    },
    {
      title: '寒假探秘计划，求建议',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-12-15',
      content: '寒假打算去秦岭走一趟，主要目标是傥骆道沿线的摩崖石刻。有去过的前辈吗？求路线建议。顺便说一下我装备已经升级了——换了个<strong>新的GPS手持机</strong>，之前那个老的在贺兰山淋了雨不太好使了。',
      isClue: false,
    },
  ],
  '贺兰山': [
    {
      title: '回忆帖：我的入门探秘——贺兰山',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-10-25',
      content: '翻了翻手机相册，看到大一国庆在<strong>贺兰山</strong>拍的照片。那时候装备简陋得不行——一个书包、一瓶水、手机导航。但那一天在岩画前坐了整整一个下午，看着那些几千年前的人留下的凿痕，突然就明白自己想做什么了。可以说<strong>贺兰山是我探秘的起点</strong>，从那之后每次出行都是这个感觉的延续。',
      isClue: true,
    },
    {
      title: '银川出发贺兰山三日徒步路线分享',
      author: '山野探秘人',
      authorUrl: '/user/mountainwolf/',
      date: '2024-09-12',
      content: '分享一条银川出发的经典路线：西夏区方向进山，沿干沟徒步约六公里，翻过海拔1800米左右的垭口到达岩画所在的崖面。沿途有明显的牧道可以跟随。需要注意的是夏季蝮蛇活跃，<strong>务必带蛇药</strong>。水源地距离岩画区约一公里，扎营需要提前备水。',
      isClue: false,
    },
  ],
  '地下三尺': [
    {
      title: '新人报到帖',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-10-20',
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是历史学。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>。从那以后就停不下来了。',
      isClue: true,
    },
  ],
  '06': [
    {
      title: '新人报到帖',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-10-20',
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是历史学。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>。',
      isClue: true,
    },
  ],
  '林屿': [
    {
      title: '新人报到',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2025-04-15',
      content: '天文系大三，研究方向是射电信号处理。对SETI和异常信号分析特别感兴趣。有同好吗？另外我也会做一些基础的<strong>信号编码与解码</strong>分析，如果有人对这方面感兴趣的可以一起讨论。',
      isClue: false,
    },
  ],
  '信号': [
    {
      title: '新人报到',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2025-04-15',
      content: '天文系大三，研究方向是射电信号处理。对SETI和异常信号分析特别感兴趣。另外我也会做一些基础的<strong>信号编码与解码</strong>分析——包括常见的<strong>移位加密（凯撒密码）</strong>、Base64编码等。如果有人对这方面感兴趣的可以一起讨论。',
      isClue: true,
    },
  ],
  '加密': [
    {
      title: '关于信息隐藏的一些想法',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2025-07-22',
      content: '最近在研究信息隐藏技术。最简单的几种：Base64（本质是编码不是加密）、<strong>凯撒移位（位移量是唯一的密钥）</strong>、以及两者的组合。用Base64套一层凯撒，对一个稍微了解编码的人来说不算难，但对路人来说几乎就是乱码。挺有意思的。',
      isClue: true,
    },
  ],
};

// 正常搜索时导航到的页面
export const MOCK_RESULTS: Record<string, string[]> = {
  '外星': ['/alien/', '/user/lyu/', '/alien/alien-001/', '/alien/alien-003/'],
  '古迹': ['/ruins/', '/user/shenci/', '/ruins/ruins-001/', '/ruins/ruins-003/'],
  '秘境': ['/ruins/', '/mystery/', '/nature/'],
  '信号': ['/user/lyu/', '/alien/alien-001/', '/alien/alien-006/'],
  '坐标': ['/user/lyu/', '/user/shenci/', '/alien/', '/ruins/'],
  '岩画': ['/ruins/ruins-001/', '/user/shenci/'],
  '神农架': ['/alien/alien-003/', '/ruins/ruins-003/'],
};

/** 根据查询词查找历史存档 */
export function findArchivedContent(query: string): ArchivedPost[] {
  const results: ArchivedPost[] = [];
  const lowerQuery = query.toLowerCase();

  for (const [keyword, posts] of Object.entries(ARCHIVED_CONTENT)) {
    if (lowerQuery.includes(keyword.toLowerCase())) {
      for (const post of posts) {
        if (!results.find(r => r.title === post.title && r.date === post.date)) {
          results.push(post);
        }
      }
    }
  }

  // 关键线索帖排前面
  return [...results.filter(p => p.isClue), ...results.filter(p => !p.isClue)];
}
