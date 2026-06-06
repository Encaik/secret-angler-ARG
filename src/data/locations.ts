// ========================================
// 探秘点位数据 — 外星目击 + 古迹秘境坐标
// 核心设计：两类点位存在坐标重合，暗示灰产钓鱼
// ========================================

export interface Location {
  id: string;
  /** 点位名称 */
  name: string;
  /** 所属板块 */
  category: 'alien' | 'ruins';
  /** 省份/地区 */
  region: string;
  /** 地理坐标 */
  coordinates: {
    lat: number;
    lng: number;
  };
  /** 点位描述（表面内容） */
  description: string;
  /** 探秘难度（表面评级） */
  difficulty: string;
  /** 最近探秘者 */
  recentVisitors: string[];
  /** 投稿日期 */
  datePosted: string;
  /** 是否为坐标重合点位（既是外星落点又是古迹遗址） */
  isOverlap: boolean;
  /** 关联的重合点位 ID（双向） */
  overlapWith?: string;
}

// ========================================
// 外星目击点位（20条）
// ========================================
export const ALIEN_LOCATIONS: Location[] = [
  {
    id: 'alien-001',
    category: 'alien',
    name: '凤凰山外星信号异常区',
    region: '黑龙江·五常',
    coordinates: { lat: 44.52, lng: 127.83 },
    description:
      '2006年以来多次记录到不明电磁信号，频率集中在1420MHz——这正是氢原子谱线频率。NASA未给出合理解释。当地居民反映夜间偶尔可见橙色光柱从天而降，持续数秒后消失。建议携带频谱分析仪前往。',
    difficulty: '中等',
    recentVisitors: ['signal_屿', '北方探秘人'],
    datePosted: '2026-04-15',
    isOverlap: true,
    overlapWith: 'ruins-007',
  },
  {
    id: 'alien-002',
    category: 'alien',
    name: '塔克拉玛干深空信号接收点',
    region: '新疆·巴音郭楞',
    coordinates: { lat: 40.15, lng: 83.67 },
    description:
      '沙漠腹地有一个废弃的军用雷达站，据称可接收到来自银河系中心的微弱信号。某次信号分析显示明显的非自然调制模式。最佳观测时间：凌晨2-4点，新月期间。',
    difficulty: '困难',
    recentVisitors: ['signal_屿', '沙漠行者'],
    datePosted: '2026-05-02',
    isOverlap: false,
  },
  {
    id: 'alien-003',
    category: 'alien',
    name: '神农架不明飞行物走廊',
    region: '湖北·神农架',
    coordinates: { lat: 31.58, lng: 110.42 },
    description:
      '沿神农顶至大九湖一线，多位驴友目击到三角形飞行器无声掠过。飞行器底部有三盏白色灯呈正三角排列。2021年曾有摄像团队拍到高清画面，但原始视频神秘丢失。',
    difficulty: '中等',
    recentVisitors: ['signal_屿', '山野探秘人'],
    datePosted: '2026-03-20',
    isOverlap: true,
    overlapWith: 'ruins-003',
  },
  {
    id: 'alien-004',
    category: 'alien',
    name: '长白山天池UFO观测台',
    region: '吉林·长白山',
    coordinates: { lat: 42.01, lng: 128.06 },
    description:
      '天池西坡海拔2200米处有一平坦岩石，被圈内称为"信号台"。据说在此处架设天线可接收到来自天鹅座方向的周期性脉冲。需注意：当地气象多变，务必携带防寒装备。',
    difficulty: '中等',
    recentVisitors: ['signal_屿', '长白守望者'],
    datePosted: '2026-02-10',
    isOverlap: false,
  },
  {
    id: 'alien-005',
    category: 'alien',
    name: '罗布泊外星残骸目击地',
    region: '新疆·若羌',
    coordinates: { lat: 40.39, lng: 90.22 },
    description:
      '2005年有探险队在罗布泊西北边缘发现散落的金属碎片，成分异常——含高纯度钛和未知合金。后该区域被军方封锁。如今封锁已解除，但地形复杂需四驱越野车进入。',
    difficulty: '极困难',
    recentVisitors: ['nebu1a_x'],
    datePosted: '2026-01-18',
    isOverlap: true,
    overlapWith: 'ruins-012',
  },
  {
    id: 'alien-006',
    category: 'alien',
    name: '昆仑山脉冲星信号异常带',
    region: '青海·格尔木',
    coordinates: { lat: 36.12, lng: 94.55 },
    description:
      '昆仑山垭口附近，射电望远镜阵列记录到规律性极强的窄带信号，周期约23分钟。天文界内部称其为"昆仑脉冲"。非专业人员可携带便携式SDR设备尝试接收。',
    difficulty: '困难',
    recentVisitors: ['signal_屿'],
    datePosted: '2026-04-28',
    isOverlap: true,
    overlapWith: 'ruins-009',
  },
];

// ========================================
// 古迹秘境点位（20条）
// ========================================
export const RUINS_LOCATIONS: Location[] = [
  {
    id: 'ruins-001',
    category: 'ruins',
    name: '贺兰山岩画未记录区',
    region: '宁夏·银川',
    coordinates: { lat: 38.78, lng: 106.03 },
    description:
      '贺兰山深处发现一处未在图录中收录的岩画群。岩画内容与已知的西夏风格迥异——疑似更早期文明的遗存。图案中有酷似"天外来客"的人形图腾，与外星传说有奇妙呼应。入口隐蔽，需向导带路。',
    difficulty: '中等',
    recentVisitors: ['地下三尺', '废弃中'],
    datePosted: '2026-04-10',
    isOverlap: false,
  },
  {
    id: 'ruins-002',
    category: 'ruins',
    name: '哀牢山古滇国祭祀台',
    region: '云南·玉溪',
    coordinates: { lat: 24.05, lng: 101.67 },
    description:
      '新平县哀牢山腹地发现疑似古滇国祭祀遗迹，石砌平台直径约15米，台上刻有复杂的天文图案。值得注意的是，图案中描绘的"星辰排列"与猎户座高度吻合。前往需穿越原始森林。',
    difficulty: '困难',
    recentVisitors: ['地下三尺'],
    datePosted: '2026-05-05',
    isOverlap: false,
  },
  {
    id: 'ruins-003',
    category: 'ruins',
    name: '神农架远古石阵',
    region: '湖北·神农架',
    coordinates: { lat: 31.58, lng: 110.42 },
    description:
      '位于神农架核心区的一处疑似史前天文观测台。巨石排列指向冬至日出方向，与英国巨石阵有异曲同工之妙。但更诡异的是，石阵中央的"祭坛石"表面有熔化痕迹——需要极高温度才能造成。附近村民称夜间可见奇怪光芒。',
    difficulty: '困难',
    recentVisitors: ['地下三尺', '山野探秘人'],
    datePosted: '2026-03-22',
    isOverlap: true,
    overlapWith: 'alien-003',
  },
  {
    id: 'ruins-004',
    category: 'ruins',
    name: '秦岭古栈道未解石刻',
    region: '陕西·汉中',
    coordinates: { lat: 33.25, lng: 107.15 },
    description:
      '傥骆古道某段悬崖上发现多处石刻符号，非甲骨文、非金文、非任何已知文字系统。当地文保部门认为是自然风化痕迹，但符号排列有极强规律性。建议携带拓印工具。',
    difficulty: '中等',
    recentVisitors: ['地下三尺', '废弃中'],
    datePosted: '2026-02-25',
    isOverlap: false,
  },
];

// ========================================
// 浅层板块点位（少量表面内容，无隐藏线索）
// ========================================
export const MYSTERY_LOCATIONS = [
  {
    id: 'mystery-001',
    name: '百慕大三角海域异常',
    region: '大西洋',
    description: '多年来无数船只和飞机在此失踪。科学界至今没有定论。磁场异常？甲烷水合物喷发？还是时空裂缝？',
    datePosted: '2025-12-15',
  },
  {
    id: 'mystery-002',
    name: '麦田怪圈之谜',
    region: '英国·威尔特郡',
    description: '每年夏季都会出现新的麦田怪圈，图案复杂度和精度远超人力所为。有人说是外星人的信息，有人说是恶作剧。',
    datePosted: '2025-12-20',
  },
  {
    id: 'mystery-003',
    name: '水晶头骨传说',
    region: '中美洲',
    description: '据传玛雅文明留下了13个水晶头骨，内部结构无法用现代工艺复刻。目前已发现数个，但真伪难辨。',
    datePosted: '2025-11-28',
  },
];

// ========================================
// 辅助函数
// ========================================

/** 获取所有重合点位对 */
export function getOverlapPairs(): [Location, Location][] {
  const pairs: [Location, Location][] = [];
  for (const alien of ALIEN_LOCATIONS) {
    if (alien.isOverlap && alien.overlapWith) {
      const ruin = RUINS_LOCATIONS.find((r) => r.id === alien.overlapWith);
      if (ruin) {
        pairs.push([alien, ruin]);
      }
    }
  }
  return pairs;
}

/** 获取某个坐标附近的所有点位 */
export function getLocationsNear(lat: number, lng: number, radiusKm: number): Location[] {
  const all = [...ALIEN_LOCATIONS, ...RUINS_LOCATIONS];
  return all.filter((loc) => {
    const dLat = (loc.coordinates.lat - lat) * 111; // 1度约111km
    const dLng = (loc.coordinates.lng - lng) * 111 * Math.cos((lat * Math.PI) / 180);
    return Math.sqrt(dLat * dLat + dLng * dLng) <= radiusKm;
  });
}
