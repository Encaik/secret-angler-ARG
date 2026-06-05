// ========================================
// 用户资料 — 现代网络风格用户名
//
// 规则：登录账号关联真名（lyu/shenci），网名抽象有圈层感
// ========================================

export interface UserProfile {
  id: string;           // 登录账号
  displayName: string;   // 网名（显示用）
  realName: string;      // 真名（仅叙事中揭示）
  avatar: string;
  bio: string;
  joinedDate: string;
  tags: string[];
  pageUrl: string;
  isKeyCharacter: boolean;
  password: string;      // 登录密码（仅关键角色有）
}

export interface UserUpdate {
  id: string;
  userId: string;
  content: string;
  date: string;
  clueTag?: string;
}

export interface UserArticle {
  id: string;
  userId: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  clueTag?: string;
  isHidden?: boolean;
}

// ========================================
// 用户资料
// ========================================

export const USERS: Record<string, UserProfile> = {
  lyu: {
    id: 'lyu',
    displayName: 'signal_屿',
    realName: '林屿',
    avatar: '/assets/images/site/avatar-lyu.png',
    bio: '深空信号分析。相信数据不相信故事。1420MHz是唯一的母语。',
    joinedDate: '2025-04-15',
    tags: ['SETI', 'signal analysis', 'UFO', 'radio astronomy'],
    pageUrl: '/user/lyu/',
    isKeyCharacter: true,
    password: 'starchaser24',
  },
  shenci: {
    id: 'shenci',
    displayName: '地下三尺',
    realName: '沈辞',
    avatar: '/assets/images/site/avatar-shenci.png',
    bio: '往下挖。每一层土都有一句话要说。不追热点，只找没人去过的地方。',
    joinedDate: '2025-10-20',
    tags: ['archaeology', 'ruins', 'offgrid', 'fieldwork'],
    pageUrl: '/user/shenci/',
    isKeyCharacter: true,
    password: 'helanshan06',
  },
  nebulax: {
    id: 'xiaoxing',
    displayName: 'nebu1a_x',
    realName: '小星',
    bio: '星野摄影入门。攒钱买赤道仪中。拍得不好但拍得认真。',
    joinedDate: '2025-09-08',
    tags: ['astrophotography', 'deep sky'],
    pageUrl: '/user/nebulax/',
    isKeyCharacter: false,
    password: '',
  },
  urbexlf: {
    id: 'laofei',
    displayName: '废弃中',
    realName: '老废',
    bio: '钻进每一栋不该进的楼。废弃是另一种活着。安全第三。',
    joinedDate: '2025-11-15',
    tags: ['urbex', 'abandoned', 'industrial'],
    pageUrl: '/user/urbexlf/',
    isKeyCharacter: false,
    password: '',
  },
  driftlang: {
    id: 'alang',
    displayName: '浪到没信号',
    realName: '阿浪',
    bio: '在路上。信号好的时候更新。',
    joinedDate: '2025-10-20',
    tags: ['backpacking', 'hitchhiking'],
    pageUrl: '/user/driftlang/',
    isKeyCharacter: false,
    password: '',
  },
};

// ========================================
// 林屿 (signal_屿) 的动态与文章
// ========================================

export const LYU_UPDATES: UserUpdate[] = [
  {
    id: 'lyu-update-001',
    userId: 'lyu',
    content: 'NASA KOI-5715.01 的光变曲线不太对。不是凌星应有的对称模式。在做频谱分析了，晚点发笔记。',
    date: '2026-05-10',
    clueTag: 'alien_signal',
  },
  {
    id: 'lyu-update-002',
    userId: 'lyu',
    content: '拉了一下近两年高信度目击点的坐标。热力图上三个聚集区都在北纬30-45。查了一下同纬度的古遗址密度——高得离谱。应该不是巧合。@地下三尺 你看看。',
    date: '2026-05-05',
    clueTag: 'coordinate_hint',
  },
  {
    id: 'lyu-update-003',
    userId: 'lyu',
    content: '@地下三尺 你上次说的贺兰山那个点，我比对过卫星图了。经纬度和我的目击数据库重合。八个点。八个。见面聊。',
    date: '2026-04-28',
    clueTag: 'overlap_discovery',
  },
  {
    id: 'lyu-update-004',
    userId: 'lyu',
    content: '去了站里推的两个"信号热点"。现场都有人类活动痕迹——篝火、烟头、被匆忙掩埋的设备残片。<strong>不像探秘者留下的</strong>——探秘者不会刻意把东西埋起来。太新了。',
    date: '2026-04-20',
    clueTag: 'site_suspicion',
  },
  {
    id: 'lyu-update-005',
    userId: 'lyu',
    content: '47个目击点的热力图做好了。最密的三个区域和地下三尺的古迹数据集高度重合。要不要重新想想这些"目击报告"的来源？',
    date: '2026-04-15',
    clueTag: 'data_analysis',
  },
  {
    id: 'lyu-update-006',
    userId: 'lyu',
    content: '站里新推的凤凰山点位我去过了。没有目击报告里说的"异常信号塔"，只有一个<strong>废弃微波中继站</strong>——80年代的民用设备，频谱特征和报告里描述的完全不是一回事。写那个报告的人要不就是根本不懂无线电，要不就是故意的。这个站的信息源到底是谁在维护？',
    date: '2026-04-08',
    clueTag: 'tech_error',
  },
  {
    id: 'lyu-update-007',
    userId: 'lyu',
    content: '入手了一台便携SDR。下次去现场可以实时扫频了。如果那些"异常信号"真的存在，我应该能抓到。抓不到的话……那些目击报告就有大问题了。',
    date: '2026-03-25',
  },
  {
    id: 'lyu-update-008',
    userId: 'lyu',
    content: 'SETI那帮人可能一开始就找错了。不该搜窄带——应该搜宽带脉冲。自然界几乎没有完美的宽带脉冲源。',
    date: '2026-03-10',
  },
  {
    id: 'lyu-update-009',
    userId: 'lyu',
    content: '暑假打算去神农架蹲几天。UFO走廊最近报告太多，而且好几个是不同人在同一时段看到的。带设备去守。',
    date: '2026-02-28',
  },
  {
    id: 'lyu-update-010',
    userId: 'lyu',
    content: '来站里快一年了，信息质量一直都还可以。至少比营销号强。先继续观望。',
    date: '2026-02-15',
  },
];

export const LYU_ARTICLES: UserArticle[] = [
  {
    id: 'lyu-article-001',
    userId: 'lyu',
    title: '凤凰山1420MHz异常信号全频段分析（2026.05更新）',
    excerpt: '三次实地扫描数据。信号确实存在，调制模式与人造源不匹配。值得关注的是信号出现的时间窗口与NASA记录的FRB有相关性——虽然这很可能只是巧合。附完整频谱图和坐标。',
    date: '2026-04-18',
    category: 'alien',
    clueTag: 'signal_analysis',
  },
  {
    id: 'lyu-article-002',
    userId: 'lyu',
    title: '全国外星目击高发区坐标数据集（47点·2025-2026）',
    excerpt: '整理了近两年收集的47个高信度目击点坐标。GIS热力图显示了三个明显的聚集区，恰好落在北纬30-45度带。有趣的是——这个纬度带也是已知冷门古遗址最密的区域。附完整坐标列表，欢迎交叉比对。',
    date: '2026-04-12',
    category: 'alien',
    clueTag: 'coordinate_dataset',
  },
  {
    id: 'lyu-article-003',
    userId: 'lyu',
    title: 'SDR入门：200块就能开始扫深空信号',
    excerpt: '不需要射电望远镜。一台RTL-SDR加笔记本就能在1420MHz扫氢线。本文介绍基础设置、常见干扰排除和信号识别。适合入门。',
    date: '2026-03-28',
    category: 'alien',
  },
  {
    id: 'lyu-article-004',
    userId: 'lyu',
    title: 'WOW信号再分析：1977年我们可能错过了什么',
    excerpt: '大耳朵望远镜1977年8月15日的著名窄带信号至今无解。新假说：信号源可能不是深空，而是地球轨道上的未知物体。本文探讨技术细节。',
    date: '2026-03-05',
    category: 'alien',
  },
  {
    id: 'lyu-article-005',
    userId: 'lyu',
    title: '信号分析的陷阱：自然界真的没有完美信号吗',
    excerpt: '规律信号≠智慧生命。脉冲星、FRB、甚至高层大气放电都能产生极规律的信号。关键指标：窄带特性、频率漂移率、调制复杂度。',
    date: '2026-02-20',
    category: 'alien',
  },
];

// ========================================
// 沈辞 (地下三尺) 的动态与文章
// ========================================

export const SHENCI_UPDATES: UserUpdate[] = [
  {
    id: 'shenci-update-001',
    userId: 'shenci',
    content: '从神农架回来了。那个"远古石阵"——逐块看了切面和风化。自然形成，非人工。但中央祭坛石上的熔化痕是真的，1500°C+才能造成。没有火山记录，没有陨石坑。目前无法解释。',
    date: '2026-05-08',
    clueTag: 'ruins_investigation',
  },
  {
    id: 'shenci-update-002',
    userId: 'shenci',
    content: '@signal_屿 我比对完了。你目击数据和我古迹坐标——八组完全重合。这不是巧合的概率有多大？我觉得这个站里有些人在做比"信息造假"更严重的事。回复我。',
    date: '2026-05-01',
    clueTag: 'overlap_confirmation',
  },
  {
    id: 'shenci-update-003',
    userId: 'shenci',
    content: '站里又推了一个"冷门秘境"给我——秦岭某处未记录摩崖。查了坐标，那个位置我去过。没有任何石刻。挺奇怪的，不知道他们的信息是从哪里来的。',
    date: '2026-04-25',
    clueTag: 'site_fabrication',
  },
  {
    id: 'shenci-update-004',
    userId: 'shenci',
    content: '越想越不对。最近去的几个推荐点都有人为活动痕迹——新鲜篝火、塑料瓶、被踩出来的小路。但问当地人都说那里极少有人去。这些痕迹不像是探秘者留下的——更像是<strong>有人在那里等过什么</strong>。',
    date: '2026-04-18',
    clueTag: 'suspicious_tracks',
  },
  {
    id: 'shenci-update-004b',
    userId: 'shenci',
    content: '今天仔细看了一个站里推荐的"明代烽燧遗址"的描述。越看越不对——描述的砖砌方式是典型的<strong>清代做法</strong>，明代烽燧根本不用那种叠砌法。而且提到的"青花瓷片"纹样风格对不上——搞考古的一眼就能看出来。到底是信息采集的人搞错了，还是这些描述根本就是<strong>编的</strong>？',
    date: '2026-04-14',
    clueTag: 'historical_error',
  },
  {
    id: 'shenci-update-005',
    userId: 'shenci',
    content: '重看了之前十个点位的现场照片。每个"秘境"附近都有一些不太自然的地方——被刻意清理过的灌木、不自然折断的树枝、一些看起来很新但被匆忙掩埋的金属残片。不像探秘者留下的——探秘者不会刻意把东西埋起来。',
    date: '2026-04-10',
    clueTag: 'ambush_traces',
  },
  {
    id: 'shenci-update-006',
    userId: 'shenci',
    content: '如果这些痕迹真的是人为留下的——那就不是一个站信息有误的问题了。但谁会花这么大力气在深山里做这种事？图什么呢？',
    date: '2026-04-05',
  },
  {
    id: 'shenci-update-007',
    userId: 'shenci',
    content: '下周去贺兰山看一批新岩画。有没有人一起？私信。',
    date: '2026-03-30',
  },
  {
    id: 'shenci-update-008',
    userId: 'shenci',
    content: '听当地人说某座山里有个"鬼洞"，洞口刻满了看不懂的符号。在地图上标了点，周末去探。',
    date: '2026-03-15',
  },
  {
    id: 'shenci-update-009',
    userId: 'shenci',
    content: '手绘了一些秦岭石刻符号。有人能认吗？附图。',
    date: '2026-03-05',
  },
  {
    id: 'shenci-update-010',
    userId: 'shenci',
    content: '新来的。站里信息质量看起来还行。潜一阵看看。',
    date: '2026-02-10',
  },
];

export const SHENCI_ARTICLES: UserArticle[] = [
  {
    id: 'shenci-article-001',
    userId: 'shenci',
    title: '贺兰山未记录岩画群 · 手绘记录与初步分析',
    excerpt: '2026年5月实地探访。该岩画群未出现在任何公开文物图录中。风格与西夏时期作品有显著差异——线条更粗犷，图案更抽象。编号HL-07的岩画描绘了头戴"圆盔"的人形与星体图案。附手绘图37幅、GPS坐标。',
    date: '2026-05-02',
    category: 'ruins',
    clueTag: 'ruins_analysis',
  },
  {
    id: 'shenci-article-002',
    userId: 'shenci',
    title: '全国冷门古迹实地考察坐标合集（23处·持续更新）',
    excerpt: '一年多实地探访了23处未受主流考古学关注的遗迹。每处记录了GPS坐标、现场照片、结构分析。读者可将这些坐标与站内"外星目击板块"的点位进行对比——你会得到一个有趣的发现。',
    date: '2026-04-22',
    category: 'ruins',
    clueTag: 'coordinate_collection',
  },
  {
    id: 'shenci-article-003',
    userId: 'shenci',
    title: '关于这个站的一些疑虑 — 写在下次出发之前',
    excerpt: '最近对这个站的信息源产生了严重怀疑。多次实地探访发现站内推荐的"冷门秘境"存在系统性的描述失实——不是"信息有误"那种失实，而是<strong>年代错位、术语混用、虚构地名</strong>这种只有编造才会出现的错误模式。一个"唐代烽燧"的描述用了清代的砖瓦术语；一个所谓的"古滇国祭祀台"，其石刻符号风格与滇文化出土文物完全不符。这些不是信息采集失误——写这些内容的人根本不懂考古。本文记录了我的发现过程。如果你也发现过类似问题，私信我。有些东西藏在表面之下。',
    date: '2026-04-25',
    category: 'ruins',
    clueTag: 'site_doubts',
  },
  {
    id: 'shenci-article-004',
    userId: 'shenci',
    title: '傥骆道考古笔记：华阳镇北悬崖的螺旋符号',
    excerpt: '沿着傥骆古道三天，在华阳镇北侧悬崖上发现了一系列从未被记录的石刻符号。排列呈螺旋状，共七圈。当地人称"仙人掌印"。无任何文献佐证。附高清照片。',
    date: '2026-03-20',
    category: 'ruins',
  },
  {
    id: 'shenci-article-005',
    userId: 'shenci',
    title: '独行探秘安全手册：一个人的野外生存指南',
    excerpt: '独行多年，总结一些经验：装备清单、行前报备流程、紧急联络、天气判断。最重要的——如果觉得不对劲，立刻回头。好奇心是好东西，但别让它变成遗书。',
    date: '2026-03-02',
    category: 'ruins',
  },
  {
    id: 'shenci-article-006',
    userId: 'shenci',
    title: '哀牢山古滇国祭祀台结构复原 · 手绘笔记',
    excerpt: '基于现场勘测数据手绘复原了哀牢山祭祀台的平面图和立面图。台上"天文图案"从正上方俯视时，排列与猎户座主星完全一致。古滇国人如何知道猎户座的精确排列？附手绘15张。',
    date: '2026-05-05',
    category: 'ruins',
    clueTag: 'ritual_platform',
  },
];

// ========================================
// 虚假用户的动态
// ========================================

export const OTHER_UPDATES: Record<string, UserUpdate[]> = {
  nebulax: [
    {
      id: 'nebulax-update-001',
      userId: 'nebulax',
      content: '昨晚拍了猎户座星云。小黑+EQ3，单张2min。比不上大佬但自己满意。有人推荐成都周边光害低的地方吗？蒲虹路已经全是露营党了。',
      date: '2026-05-03',
    },
    {
      id: 'nebulax-update-002',
      userId: 'nebulax',
      content: '在闲鱼蹲到了一台二手赤道仪，价格还不错。接下来几个月吃土。',
      date: '2026-04-12',
    },
  ],
  urbexlf: [
    {
      id: 'urbexlf-update-001',
      userId: 'urbexlf',
      content: '东郊那个废弃化工厂探了。80年代建筑，保存不错。找到了当年的操作手册，纸都脆了，翻开差点碎掉。',
      date: '2026-05-01',
    },
    {
      id: 'urbexlf-update-002',
      userId: 'urbexlf',
      content: '提醒一下：最近好几个"废弃医院"的点位信息是假的。有人专门在论坛编坐标骗人去。去了发现是在建工地，保安报了警。注意甄别。',
      date: '2026-04-18',
    },
  ],
  driftlang: [
    {
      id: 'driftlang-update-001',
      userId: 'driftlang',
      content: '川西回来了。风景没得说。网上说的"秘境"没找到，估计又是瞎传的。以后还是信旅游局靠谱点。',
      date: '2026-04-30',
    },
    {
      id: 'driftlang-update-002',
      userId: 'driftlang',
      content: '虎跳峡新开那条徒步线有人走过吗？网上说能看到"远古岩画"，问了好几个去过的人都说没看到。',
      date: '2026-03-22',
    },
    {
      id: 'driftlang-update-003',
      userId: 'driftlang',
      content: '背包第七年。最大感受：90%的"秘境"是当地人编出来赚游客钱的。剩下10%是真的，但太难找了。',
      date: '2026-02-15',
    },
  ],
  // ---- 氛围路人动态（纯社区真实感，无谜题） ----
  hyacinth: [
    { id: 'hyacinth-update-001', userId: 'hyacinth', content: '五月的山里到处都是金银花。采了一些，晒干了泡茶。小时候外婆家院子里就有一大丛金银花，闻到这个味道就像回到了七岁。', date: '2026-05-15' },
    { id: 'hyacinth-update-002', userId: 'hyacinth', content: '有人知道四川境内哪里能看到野生杓兰吗？翻了几本植物志都说有分布，但坐标都不太准。想趁花期去一次。', date: '2026-03-08' },
  ],
  lat37n: [
    { id: 'lat37n-update-001', userId: 'lat37n', content: '上周末去了趟冷湖。那边新划了暗夜保护区，光害地图上是全黑的。银河亮得能照出影子。', date: '2026-05-22' },
    { id: 'lat37n-update-002', userId: 'lat37n', content: '有没有人关注韦伯那组K2-18b大气光谱？二甲基硫醚的信号虽然还没确认，但如果真的……', date: '2026-03-15' },
  ],
  stonebook: [
    { id: 'stonebook-update-001', userId: 'stonebook', content: '导师让我暑假去大别山补充采样。太好了——终于不用整天在实验室看薄片了。虽然野外蚊子多，但比写论文强一万倍。', date: '2026-05-25' },
    { id: 'stonebook-update-002', userId: 'stonebook', content: '分享一下上周拍的薄片：石榴石+蓝晶石+多硅白云母的组合。偏光镜下颜色太漂亮了，像教堂的彩色玻璃窗。', date: '2026-04-15' },
  ],
  nightowl: [
    { id: 'nightowl-update-001', userId: 'nightowl', content: '昨晚去了城郊那个废弃纺织厂。月光从天窗照进来刚好打在旧传送带上。ISO3200，30秒。出来效果绝了。', date: '2026-05-18' },
    { id: 'nightowl-update-002', userId: 'nightowl', content: '修图修到凌晨四点。三组光绘+废弃建筑，一组银河拱桥。眼睛快瞎了但就是停不下来。', date: '2026-03-30' },
  ],
  bigriver: [
    { id: 'bigriver-update-001', userId: 'bigriver', content: '金沙江这段水又浑了。上游肯定在施工。蹲了三个小时就上了两条白条。以前这里一个下午能拉十几条。', date: '2026-05-10' },
    { id: 'bigriver-update-002', userId: 'bigriver', content: '提醒钓友：最近长江禁渔期，主河道不能下竿。可以玩支流和水库。别存侥幸心理。', date: '2026-03-15' },
  ],
  slowpost: [
    { id: 'slowpost-update-001', userId: 'slowpost', content: '白果村那座清代石拱桥上周被拆了。跑这条线十五年，以后过这里就看不到那个桥了。还好前年拍过一张——下雪天拍的，桥洞下面挂了冰凌。', date: '2026-05-12' },
    { id: 'slowpost-update-002', userId: 'slowpost', content: '摩托车的里程表今天过十万公里了。算了一下如果把这些年跑的山路拉直，差不多能绕地球两圈半。轮胎又该换了。', date: '2026-02-22' },
  ],
};

// ========================================
// 普通用户（无剧情线索，仅作论坛氛围）
// ========================================

export const FLAVOR_USERS: Record<string, UserProfile> = {
  mountainwolf: {
    id: 'mountainwolf',
    displayName: '山野探秘人',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '走过二十三个省。最美的风景永远不在攻略上。',
    joinedDate: '2025-03-08',
    tags: ['hiking', 'backpacking'],
    pageUrl: '/user/mountainwolf/',
    isKeyCharacter: false,
    password: '',
  },
  starwalker: {
    id: 'starwalker',
    displayName: '星海漫步',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '望远镜+赤道仪。深空摄影入门中。',
    joinedDate: '2025-07-15',
    tags: ['astrophotography', 'observation'],
    pageUrl: '/user/starwalker/',
    isKeyCharacter: false,
    password: '',
  },
  urbanwild: {
    id: 'urbanwild',
    displayName: '城市野人',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '城市废墟探险。工业遗址爱好者。',
    joinedDate: '2025-09-22',
    tags: ['urbex', 'industrial'],
    pageUrl: '/user/urbanwild/',
    isKeyCharacter: false,
    password: '',
  },
  deephunter: {
    id: 'deephunter',
    displayName: '深海猎手',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '技术宅。搞过几年服务器运维。对水下考古感兴趣——虽然没真潜过几次。目前在转行做自由职业。有同好可以私信交流线下面基。',
    joinedDate: '2024-11-30',
    tags: ['diving', 'underwater', 'tech', 'server'],
    pageUrl: '/user/deephunter/',
    isKeyCharacter: false,
    password: '',
  },
  oldcat: {
    id: 'oldcat',
    displayName: '老猫',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '退休地理教师。走了大半辈子野路。',
    joinedDate: '2024-06-12',
    tags: ['geography', 'folklore'],
    pageUrl: '/user/oldcat/',
    isKeyCharacter: false,
    password: '',
  },
  // ---- 氛围路人用户（无谜题关联，纯粹营造社区真实感） ----
  hyacinth: {
    id: 'hyacinth',
    displayName: '风信子',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '山野植物观察。能认三百种野花。花粉过敏但还是要进山。',
    joinedDate: '2025-05-20',
    tags: ['botany', 'hiking', 'nature'],
    pageUrl: '/user/hyacinth/',
    isKeyCharacter: false,
    password: '',
  },
  lat37n: {
    id: 'lat37n',
    displayName: '北纬37',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '观星十年。道布森16寸。北纬37度线附近的暗夜区基本都去过。',
    joinedDate: '2025-03-15',
    tags: ['astronomy', 'stargazing', 'dark sky'],
    pageUrl: '/user/lat37n/',
    isKeyCharacter: false,
    password: '',
  },
  stonebook: {
    id: 'stonebook',
    displayName: '石头记',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '地质系研究生。走到哪敲到哪。专攻变质岩，对沉积构造也很感兴趣。',
    joinedDate: '2025-07-08',
    tags: ['geology', 'mineralogy', 'fieldwork'],
    pageUrl: '/user/stonebook/',
    isKeyCharacter: false,
    password: '',
  },
  nightowl: {
    id: 'nightowl',
    displayName: '夜不收',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '专拍夜景废墟和光绘。佳能6D改机。长曝光能拍到一些肉眼看不到的东西。',
    joinedDate: '2025-08-22',
    tags: ['photography', 'night', 'urbex', 'light painting'],
    pageUrl: '/user/nightowl/',
    isKeyCharacter: false,
    password: '',
  },
  bigriver: {
    id: 'bigriver',
    displayName: '大江',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '钓鱼二十年。沿着长江和支流跑了半辈子。不是专业的，但知道哪里有好水。',
    joinedDate: '2025-02-10',
    tags: ['fishing', 'river', 'outdoor'],
    pageUrl: '/user/bigriver/',
    isKeyCharacter: false,
    password: '',
  },
  slowpost: {
    id: 'slowpost',
    displayName: '慢邮差',
    realName: '',
    avatar: '/assets/images/site/avatar-default.png',
    bio: '乡镇邮递员。每天骑摩托跑山路。跑过的村子比快递单还多。喜欢拍沿途的老房子。',
    joinedDate: '2024-08-15',
    tags: ['rural', 'old architecture', 'motorcycle', 'photography'],
    pageUrl: '/user/slowpost/',
    isKeyCharacter: false,
    password: '',
  },
};
