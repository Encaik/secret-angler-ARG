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
  /** 可选：点击标题跳转到的页面（用于缓存页面/隐藏页面） */
  pageUrl?: string;
}

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
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是电子信息工程。不过比起实验室，我更喜欢往没人的野外跑——对冷门古迹特别感兴趣。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>——一个人背着帐篷在岩画前坐了一下午。从那以后就停不下来了。希望在这里能找到同好。',
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
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是电子信息工程。不过比起实验室，我更喜欢往没人的野外跑——对冷门古迹特别感兴趣。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>——一个人背着帐篷在岩画前坐了一下午。从那以后就停不下来了。希望在这里能找到同好。',
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
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是电子信息工程，课余热爱古迹探访。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>。从那以后就停不下来了。',
      isClue: true,
    },
  ],
  '06': [
    {
      title: '新人报到帖',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-10-20',
      content: '在论坛潜了一段时间，今天正式注册。我是<strong>06年的</strong>，现在大二，专业是电子信息工程，课余热爱古迹探访。第一个正经探访的遗址是大一那年国庆去的<strong>贺兰山</strong>。',
      isClue: true,
    },
  ],
  '林屿': [
    {
      title: '新人报到',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2025-04-15',
      content: '电子信息工程专业。课余研究方向是射电信号处理，对SETI和异常信号分析特别感兴趣。有同好吗？另外我也会做一些基础的<strong>信号编码与解码</strong>分析，如果有人对这方面感兴趣的可以一起讨论。',
      isClue: false,
    },
  ],
  '信号': [
    {
      title: '新人报到',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2025-04-15',
      content: '电子信息工程专业。课余研究方向是射电信号处理，对SETI和异常信号分析特别感兴趣。另外我也会做一些基础的<strong>信号编码与解码</strong>分析——包括常见的<strong>模式识别与信息隐藏</strong>等。如果有人对这方面感兴趣的可以一起讨论。',
      isClue: true,
    },
  ],
  '加密': [
    {
      title: '关于信息隐藏的一些想法',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2025-07-22',
      content: '最近在研究信息隐藏技术。最经典也最不容易被察觉的：<strong>藏头藏尾——把信息藏在每段开头或结尾</strong>。还有一种是把关键词拆开，分布在看似无关的文字段落里，你只要<strong>注意文字的排列方式</strong>就能发现。对一个细心的人来说，<strong>观察比计算更管用</strong>。挺有意思的——有时候答案就摆在最显眼的位置，但大部分人就是看不见。',
      isClue: true,
    },
  ],
  'GPS': [
    {
      title: '寒假探秘计划，求建议',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2025-12-15',
      content: '寒假打算去秦岭走一趟，主要目标是傥骆道沿线的摩崖石刻。有去过的前辈吗？求路线建议。顺便说一下我装备已经升级了——换了个<strong>新的GPS手持机</strong>，之前那个老的在贺兰山淋了雨不太好使了。',
      isClue: true,
    },
  ],
  '蛇药': [
    {
      title: '银川出发贺兰山三日徒步路线分享',
      author: '山野探秘人',
      authorUrl: '/user/mountainwolf/',
      date: '2024-09-12',
      content: '分享一条银川出发的经典路线：西夏区方向进山，沿干沟徒步约六公里，翻过海拔1800米左右的垭口到达岩画所在的崖面。沿途有明显的牧道可以跟随。需要注意的是夏季蝮蛇活跃，<strong>务必带蛇药</strong>。水源地距离岩画区约一公里，扎营需要提前备水。',
      isClue: false,
    },
  ],
  '山野探秘人': [
    {
      title: '银川出发贺兰山三日徒步路线分享',
      author: '山野探秘人',
      authorUrl: '/user/mountainwolf/',
      date: '2024-09-12',
      content: '分享一条银川出发的经典路线：西夏区方向进山，沿干沟徒步约六公里到达岩画所在的崖面。沿途有明显的牧道可以跟随。需要注意的是夏季蝮蛇活跃，务必带蛇药。',
      isClue: false,
    },
  ],
  '龙骨': [
    {
      title: 'SDR扫频拦截记录（会员区存档）',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2026-05-30',
      content: '昨晚SDR扫频，935-960MHz GSM下行频段拦到一条未加密短信。内容片段："新客待激活"、"下批出货"、"<strong>龙骨尾款</strong>"。虚商号段，加密方式已废弃（A5/0）。这种措辞不像正常的商业短信——更像是某种圈内黑话。',
      isClue: true,
    },
  ],
  '永无止境': [
    {
      title: '关于这个站的一些疑虑 — 写在下次出发之前',
      author: '地下三尺',
      authorUrl: '/user/shenci/',
      date: '2026-04-25',
      content: '最近对这个站的信息源产生了严重怀疑。多次实地探访发现站内推荐的"冷门秘境"存在系统性的描述失实。更让人在意的是，翻看已废弃的"秘境徒步联盟"网页快照时发现——两个站点的公告措辞模板几乎一致。"<strong>永无止境</strong>"、"安全第一"——连断行位置都相同。如果这两个站是同一伙人运营的，那公告就不是单纯的公告。',
      isClue: true,
    },
  ],
  '凤凰山': [
    {
      title: '凤凰山1420MHz异常信号全频段分析',
      author: 'signal_屿',
      authorUrl: '/user/lyu/',
      date: '2026-04-18',
      content: '三次实地扫描<strong>凤凰山</strong>点位的数据。信号确实存在，但调制模式分析显示——信号源并非自然天体。频谱特征更接近<strong>民用SDR设备</strong>（HackRF One级别）产生的调制信号。写那个目击报告的人要不就是根本不懂无线电，要不就是故意的。',
      isClue: true,
    },
  ],
  '轻舟云盘': [
    {
      title: '推荐一个探秘资料备份工具——轻舟云盘',
      author: '星海漫步',
      authorUrl: '/user/starwalker/',
      date: '2026-01-15',
      content: '探了几年，照片、手绘、GPS轨迹攒了几十个G。之前一直用移动硬盘，结果去年在川西淋了雨报废了一个——血的教训。后来换了<strong>轻舟云盘</strong>，国产的，免费容量够用，关键是支持<strong>加密共享文件夹</strong>。你可以设提取码，把整个文件夹加密分享给队友——码丢了谁也打不开。我们几个常一起跑的探友现在都用这个同步数据。网页版直接访问就行，不用装客户端。<strong>强烈推荐给经常出野外的</strong>。',
      isClue: true,
    },
  ],
  '云盘': [
    {
      title: '推荐一个探秘资料备份工具——轻舟云盘',
      author: '星海漫步',
      authorUrl: '/user/starwalker/',
      date: '2026-01-15',
      content: '探了几年，照片、手绘、GPS轨迹攒了几十个G。之前一直用移动硬盘，结果去年在川西淋了雨报废了一个——血的教训。后来换了<strong>轻舟云盘</strong>，国产的，免费容量够用，关键是支持<strong>加密共享文件夹</strong>。你可以设提取码，把整个文件夹加密分享给队友——码丢了谁也打不开。我们几个常一起跑的探友现在都用这个同步数据。网页版直接访问就行，不用装客户端。<strong>强烈推荐给经常出野外的</strong>。',
      isClue: true,
    },
  ],
};

// 搜索"深海裂隙2026"触发谜题解锁（唯一的特殊逻辑，不直接跳转）
export const PUZZLE_ANSWER = '深海裂隙2026';

// ========================================
// 隐藏页面缓存结果（搜索关键词 → 出现在搜索结果中，用户点击链接访问）
// 替代之前的直接跳转逻辑。模拟搜索引擎缓存了这些内部页面。
// ========================================
export const HIDDEN_PAGE_CACHE: Record<string, ArchivedPost> = {
  '深海裂隙': {
    title: '内部系统操作日志（缓存片段）',
    author: '[搜索引擎缓存]',
    authorUrl: '',
    date: '快照于 2026-06-01',
    content: '……内部项目记录（5项）、群组通讯片段（05/24-06/01）、站点状态快照。多处数据因缓存损坏无法恢复。来源页面已不可访问（HTTP 410 Gone）。表面为某组织的内部管理系统记录，但其中包含的坐标和代号与失踪探秘者的信息高度吻合。',
    isClue: true,
    pageUrl: '/trigger/rift',
  },
  '星门坐标': {
    title: '信号灯阵列部署记录 · 缓存片段',
    author: '[搜索引擎缓存]',
    authorUrl: '',
    date: '快照于 2026-05-29',
    content: '……共47处信号灯部署记录。灯型、频段参数、设灯日期。贺兰山位DL-003标记为"行动完成"。原始记录已被删除，仅恢复5条。页面归因于某组织的据点管理系统。',
    isClue: true,
    pageUrl: '/trigger/stargate',
  },
  '布景基地': {
    title: '基地运营记录 · 缓存片段',
    author: '[暗网缓存]',
    authorUrl: '',
    date: '快照于 2026-05-28',
    content: '……废弃萤石矿改造的地下基地。含体检分类区、关押区、直播区、医疗区、暗网管理室、安保后勤区六个区域说明。原始文件存于.onion站点"因缘海"，已不可访问。',
    isClue: true,
    pageUrl: '/trigger/base',
  },
  '深度探秘': {
    title: '内容审核员招募 — 探秘者联盟导航站',
    author: '[站内页面]',
    authorUrl: '',
    date: '',
    content: '……"内容审核员（深度探秘方向）"岗位要求：注册满一年，发布过至少5篇原创探秘内容。深度探秘级别的审核员可访问站点历史档案库和专属资料线路，用于交叉验证投稿内容。申请请前往"加入我们"页面。',
    isClue: false,
    pageUrl: '/about',
  },
  '归源宗': {
    title: '归源宗 · 功德流通处',
    author: '[独立站点]',
    authorUrl: '',
    date: '',
    content: '……一个独立的佛教寺院在线供养平台。提供金刚舍利供养、甘露供养、金身渡化等功德项目。网站设计古朴，法会日程、施主芳名墙、法会直播等功能齐全。看起来是一个正常运营的宗教网站。',
    isClue: true,
    pageUrl: '/hidden/darknet',
  },
  '后台管理': {
    title: '归源宗 · 内部管理系统',
    author: '[受限页面]',
    authorUrl: '',
    date: '',
    content: '……需凭账号和密码登录。若遗忘密码，须联系管理员重置。页面为某组织的内部管理入口，外观为普通网站管理后台。',
    isClue: true,
    pageUrl: '/hidden/admin',
  },
  '秘境之下': {
    title: '善信认证 · 会员专区',
    author: '[受限页面]',
    authorUrl: '',
    date: '',
    content: '……此区域为探秘者联盟的高级善信专区，仅对已认证探秘者开放。需会员权限方可入内。',
    isClue: false,
    pageUrl: '/member/login',
  },
  '轻舟云盘': {
    title: '轻舟云盘 · 加密共享文件夹',
    author: '[外部服务]',
    authorUrl: '',
    date: '',
    content: '……共享文件夹"调查资料"，创建者shenci933。5个文件。需要提取码才能查看文件内容。',
    isClue: true,
    pageUrl: '/share',
  },
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
  '凤凰山': ['/alien/alien-001/', '/user/lyu/'],
  '秦岭': ['/ruins/ruins-001/', '/user/shenci/'],
  '贺兰山': ['/ruins/ruins-001/', '/user/shenci/', '/community/post/247/'],
  '深空': ['/alien/', '/ruins/', '/hollow-earth/'],
  '探秘': ['/community/', '/user/shenci/', '/alien/', '/ruins/'],
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
