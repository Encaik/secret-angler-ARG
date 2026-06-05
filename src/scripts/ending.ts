// ========================================
// 结局判定引擎
// 根据玩家收集的证据完整度，判定四个结局之一
// 同时挂载到 window 以便内联脚本调用
// ========================================

// 证据页面对照表：访问过的关键页面 → 证据项
const EVIDENCE_MAP: Record<string, { id: string; weight: number; name: string }> = {
  '/trigger/rift':      { id: 'E1', weight: 2, name: '多站钓鱼方案矩阵' },
  '/trigger/stargate':  { id: 'E2', weight: 2, name: '信号伪造技术方案' },
  '/trigger/base':      { id: 'E3', weight: 3, name: '基地设施蓝图' },
  '/hidden/panlongxia': { id: 'E4', weight: 3, name: '暗网交易市场记录' },
  '/hidden/board':      { id: 'E5', weight: 2, name: '内部通讯记录' },
  '/hidden/operation':  { id: 'E6', weight: 2, name: '作案流程手册' },
  '/hidden/locations':  { id: 'E7', weight: 3, name: '基地精确坐标' },
  '/hidden/dead-drop':  { id: 'E8', weight: 4, name: '叛变成员举报脚本' },
};

export interface EndingResult {
  ending: 1 | 2 | 3 | 4;
  score: number;
  maxScore: number;
  collected: string[];
  missing: string[];
}

/**
 * 根据玩家进度计算结局
 * 返回结局编号(1-4)及详细得分信息
 */
export function evaluateEnding(): EndingResult {
  const progress = JSON.parse(localStorage.getItem('arg_progress') || '{}');
  const visited: string[] = progress.discoveredPages || [];

  let score = 0;
  const collected: string[] = [];
  const missing: string[] = [];

  for (const [page, evidence] of Object.entries(EVIDENCE_MAP)) {
    // 检查是否访问过该页面（支持有/无尾部斜杠两种格式）
    const found = visited.some((v: string) =>
      v === page || v === page + '/' || v.replace(/\/$/, '') === page
    );
    if (found) {
      score += evidence.weight;
      collected.push(evidence.name);
    } else {
      missing.push(evidence.name);
    }
  }

  // 判定结局
  let ending: 1 | 2 | 3 | 4;
  if (score >= 18) {
    ending = 4;
  } else if (score >= 12) {
    ending = 3;
  } else if (score >= 7) {
    ending = 2;
  } else {
    ending = 1;
  }

  // 额外规则：如果拿到了E8（叛变者举报脚本）且总分≥12，自动升级为结局4
  const hasDeadDrop = visited.some((v: string) =>
    v.includes('/hidden/dead-drop')
  );
  if (hasDeadDrop && score >= 12 && ending !== 4) {
    ending = 4;
  }

  // 如果证据严重不足（<7分）且尝试直接去贺兰山 → 强制结局1
  if (score < 7 && progress.playerTargeted) {
    ending = 1;
  }

  const maxScore = Object.values(EVIDENCE_MAP).reduce((s, e) => s + e.weight, 0);

  return { ending, score, maxScore, collected, missing };
}

/**
 * 获取结局对应的页面URL
 */
export function getEndingUrl(ending: number): string {
  const BASE = (window as any).__BASE__ || '/';
  return `${BASE}ending/${ending}/`;
}

// 挂载到 window 以便内联脚本调用（解决 Astro .astro 中内联 <script> 无法 import 的问题）
if (typeof window !== 'undefined') {
  (window as any).__endingEngine = {
    EVIDENCE_MAP,
    evaluateEnding,
    getEndingUrl,
  };
}
