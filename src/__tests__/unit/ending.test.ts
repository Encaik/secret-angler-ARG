// ========================================
// 结局判定引擎单元测试
// 测试 evaluateEnding() 和 getEndingUrl()
// ========================================

import { describe, it, expect, beforeEach } from 'vitest';
import { evaluateEnding, getEndingUrl } from '../../scripts/ending';
import { createEmptyProgress, seedProgress } from '../helpers';

describe('evaluateEnding', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ========================================
  // 分数阈值边界测试
  // ========================================
  describe('score threshold boundaries', () => {
    it('returns ending 1 when score is 0 (no evidence)', () => {
      seedProgress(createEmptyProgress({ discoveredPages: [] }));
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
      expect(result.score).toBe(0);
    });

    it('returns ending 1 when score is 6 (upper bound of ending 1)', () => {
      // E1(2) + E2(2) + E5(2) = 6
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate', '/hidden/board'],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
      expect(result.score).toBe(6);
    });

    it('returns ending 2 when score is 7 (lower bound of ending 2)', () => {
      // E1(2) + E2(2) + E3(3) = 7
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate', '/trigger/base'],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(2);
      expect(result.score).toBe(7);
    });

    it('returns ending 2 when score is 11 (upper bound of ending 2)', () => {
      // E1(2) + E2(2) + E3(3) + E4(3) + E5(2) = 12 → ending 3
      // E1(2) + E2(2) + E3(3) + E5(2) + E6(2) = 11
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate', '/trigger/base', '/hidden/board', '/hidden/operation'],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(2);
      expect(result.score).toBe(11);
    });

    it('returns ending 3 when score is 12 (lower bound of ending 3)', () => {
      // E1(2) + E2(2) + E3(3) + E4(3) + E5(2) = 12
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate', '/trigger/base', '/hidden/darknet', '/hidden/board'],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(3);
      expect(result.score).toBe(12);
    });

    it('returns ending 3 when score is 17 (upper bound of ending 3)', () => {
      // E1(2)+E2(2)+E3(3)+E4(3)+E5(2)+E6(2)+E7(3) = 17
      seedProgress(createEmptyProgress({
        discoveredPages: [
          '/trigger/rift', '/trigger/stargate', '/trigger/base',
          '/hidden/darknet', '/hidden/board', '/hidden/operation', '/hidden/locations',
        ],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(3);
      expect(result.score).toBe(17);
    });

    it('returns ending 4 when score is 18 (lower bound of ending 4)', () => {
      // All except E8: 2+2+3+3+2+2+3+4=21. Without E7(3): 2+2+3+3+2+2+0+4=18
      seedProgress(createEmptyProgress({
        discoveredPages: [
          '/trigger/rift', '/trigger/stargate', '/trigger/base',
          '/hidden/darknet', '/hidden/board', '/hidden/operation', '/hidden/dead-drop',
        ],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(4);
      expect(result.score).toBe(18);
    });

    it('returns ending 4 when score is 21 (max score)', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: [
          '/trigger/rift', '/trigger/stargate', '/trigger/base',
          '/hidden/darknet', '/hidden/board', '/hidden/operation',
          '/hidden/locations', '/hidden/dead-drop',
        ],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(4);
      expect(result.score).toBe(21);
    });
  });

  // ========================================
  // E8 特殊规则
  // ========================================
  describe('E8 dead-drop auto-upgrade rule', () => {
    it('auto-upgrades to ending 4 when dead-drop collected and score >= 12', () => {
      // E1(2)+E2(2)+E3(3)+E7(3)+E8(4) = 14, without E8 it's 10 (ending 2)
      // With E8 upgrade: should be ending 4
      seedProgress(createEmptyProgress({
        discoveredPages: [
          '/trigger/rift', '/trigger/stargate', '/trigger/base',
          '/hidden/locations', '/hidden/dead-drop',
        ],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(4);
    });

    it('does NOT auto-upgrade when dead-drop collected but score < 12', () => {
      // E1(2)+E2(2)+E8(4) = 8, score < 12, should be ending 2 not 4
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate', '/hidden/dead-drop'],
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(2);
    });
  });

  // ========================================
  // playerTargeted 规则
  // ========================================
  describe('playerTargeted forced ending 1 rule', () => {
    it('forces ending 1 when score < 7 and playerTargeted is true', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate'],
        playerTargeted: true,
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
    });

    it('does NOT force ending 1 when score < 7 but playerTargeted is false', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate'],
        playerTargeted: false,
      }));
      const result = evaluateEnding();
      expect(result.ending).toBe(1); // Already ending 1 due to low score
    });
  });

  // ========================================
  // 页面路径匹配
  // ========================================
  describe('page path matching', () => {
    it('matches pages with trailing slash', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift/', '/trigger/stargate/'],
      }));
      const result = evaluateEnding();
      expect(result.score).toBe(4);
      expect(result.collected).toContain('多站钓鱼方案矩阵');
      expect(result.collected).toContain('信号伪造技术方案');
    });

    it('matches pages without trailing slash', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate'],
      }));
      const result = evaluateEnding();
      expect(result.score).toBe(4);
    });

    it('matches mixed slash formats', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift/', '/trigger/stargate'],
      }));
      const result = evaluateEnding();
      expect(result.score).toBe(4);
    });
  });

  // ========================================
  // collected / missing 列表
  // ========================================
  describe('collected and missing evidence', () => {
    it('lists collected evidence correctly', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift', '/trigger/stargate'],
      }));
      const result = evaluateEnding();
      expect(result.collected).toEqual(['多站钓鱼方案矩阵', '信号伪造技术方案']);
    });

    it('lists missing evidence correctly', () => {
      seedProgress(createEmptyProgress({
        discoveredPages: ['/trigger/rift'],
      }));
      const result = evaluateEnding();
      expect(result.missing).toContain('信号伪造技术方案');
      expect(result.missing).toContain('基地设施蓝图');
      expect(result.missing).toContain('叛变成员举报脚本');
    });

    it('returns maxScore of 21', () => {
      seedProgress(createEmptyProgress());
      const result = evaluateEnding();
      expect(result.maxScore).toBe(21);
    });
  });

  // ========================================
  // 边界情况
  // ========================================
  describe('edge cases', () => {
    it('handles empty localStorage gracefully', () => {
      // localStorage is empty (no arg_progress key)
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
      expect(result.score).toBe(0);
      expect(result.collected).toEqual([]);
    });

    it('handles localStorage with no discoveredPages', () => {
      localStorage.setItem('arg_progress', JSON.stringify({ other: 'data' }));
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
      expect(result.score).toBe(0);
    });

    it('handles corrupted localStorage data', () => {
      localStorage.setItem('arg_progress', 'not valid json{{');
      expect(() => evaluateEnding()).toThrow();
    });
  });
});

// ========================================
// getEndingUrl 测试
// ========================================
describe('getEndingUrl', () => {
  it('returns /ending/1/ for ending 1', () => {
    expect(getEndingUrl(1)).toBe('/ending/1/');
  });

  it('returns /ending/4/ for ending 4', () => {
    expect(getEndingUrl(4)).toBe('/ending/4/');
  });

  it('uses window.__BASE__ prefix', () => {
    (window as any).__BASE__ = '/secret-angler-ARG/';
    expect(getEndingUrl(1)).toBe('/secret-angler-ARG/ending/1/');
    // Reset
    (window as any).__BASE__ = '/';
  });

  it('falls back to / when __BASE__ is undefined', () => {
    const originalBase = (window as any).__BASE__;
    delete (window as any).__BASE__;
    // getEndingUrl uses `(window as any).__BASE__ || '/'`
    // After deletion it will be undefined, so fallback to '/'
    expect(getEndingUrl(3)).toBe('/ending/3/');
    // Restore
    (window as any).__BASE__ = originalBase;
  });
});
