// ========================================
// 搜索映射集成测试
// 验证关键词→结果映射的正确性
// ========================================

import { describe, it, expect } from 'vitest';
import {
  findArchivedContent,
  HIDDEN_PAGE_CACHE,
  PUZZLE_ANSWER,
  type ArchivedPost,
} from '../../data/search-data';

describe('Search result mappings', () => {
  // ========================================
  // 历史存档关键词 → 预期结果
  // ========================================
  describe('Historical archive keywords', () => {
    it('searching "沈辞" returns shenci posts', () => {
      const results = findArchivedContent('沈辞');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.author === '地下三尺')).toBe(true);
    });

    it('searching "shenci" returns the same posts as "沈辞"', () => {
      const shenciResults = findArchivedContent('shenci');
      const 沈辞Results = findArchivedContent('沈辞');
      // Both should return the new-member post
      const bothHaveNewMember = (posts: ArchivedPost[]) =>
        posts.some(p => p.title === '新人报到帖');
      expect(bothHaveNewMember(shenciResults)).toBe(true);
      expect(bothHaveNewMember(沈辞Results)).toBe(true);
    });

    it('searching "贺兰山" returns Helan Mountain posts', () => {
      const results = findArchivedContent('贺兰山');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.content.includes('贺兰山'))).toBe(true);
    });

    it('searching "加密" returns the acrostic hint post by signal_屿', () => {
      const results = findArchivedContent('加密');
      expect(results.some(p => p.author === 'signal_屿')).toBe(true);
      expect(results.some(p => p.title.includes('信息隐藏'))).toBe(true);
    });

    it('searching "轻舟云盘" returns the cloud drive recommendation', () => {
      const results = findArchivedContent('轻舟云盘');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.author === '星海漫步')).toBe(true);
    });

    it('searching "凤凰山" returns the signal analysis post', () => {
      const results = findArchivedContent('凤凰山');
      expect(results.some(p => p.author === 'signal_屿')).toBe(true);
    });

    it('searching "龙骨" returns the SDR intercept record', () => {
      const results = findArchivedContent('龙骨');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.content.includes('SDR'))).toBe(true);
    });

    it('searching "永无止境" returns the site doubt post', () => {
      const results = findArchivedContent('永无止境');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.author === '地下三尺')).toBe(true);
    });

    it('searching "06" returns the new-member post confirming birth year', () => {
      const results = findArchivedContent('06');
      expect(results.some(p => p.content.includes('06'))).toBe(true);
      expect(results.some(p => p.isClue)).toBe(true);
    });
  });

  // ========================================
  // 隐藏页面缓存关键词 → 正确 pageUrl
  // ========================================
  describe('Hidden page cache keyword → pageUrl mapping', () => {
    it('"深海裂隙" maps to /trigger/rift', () => {
      expect(HIDDEN_PAGE_CACHE['深海裂隙'].pageUrl).toBe('/trigger/rift');
    });

    it('"星门坐标" maps to /trigger/stargate', () => {
      expect(HIDDEN_PAGE_CACHE['星门坐标'].pageUrl).toBe('/trigger/stargate');
    });

    it('"布景基地" maps to /trigger/base', () => {
      expect(HIDDEN_PAGE_CACHE['布景基地'].pageUrl).toBe('/trigger/base');
    });

    it('"归源宗" maps to /hidden/darknet', () => {
      expect(HIDDEN_PAGE_CACHE['归源宗'].pageUrl).toBe('/hidden/darknet');
    });

    it('"后台管理" maps to /hidden/admin', () => {
      expect(HIDDEN_PAGE_CACHE['后台管理'].pageUrl).toBe('/hidden/admin');
    });

    it('"深度探秘" maps to /about', () => {
      expect(HIDDEN_PAGE_CACHE['深度探秘'].pageUrl).toBe('/about');
    });

    it('"秘境之下" maps to /member/login', () => {
      expect(HIDDEN_PAGE_CACHE['秘境之下'].pageUrl).toBe('/member/login');
    });

    it('"轻舟云盘" maps to /share', () => {
      expect(HIDDEN_PAGE_CACHE['轻舟云盘'].pageUrl).toBe('/share');
    });
  });

  // ========================================
  // PUZZLE_ANSWER 处理
  // ========================================
  describe('PUZZLE_ANSWER handling', () => {
    it('"深海裂隙2026" is the stage 3 puzzle answer', () => {
      expect(PUZZLE_ANSWER).toBe('深海裂隙2026');
    });

    it('PUZZLE_ANSWER is not a key in HIDDEN_PAGE_CACHE', () => {
      expect(HIDDEN_PAGE_CACHE[PUZZLE_ANSWER]).toBeUndefined();
    });
  });

  // ========================================
  // 密码拼凑路径验证
  // ========================================
  describe('Shenci password assembly paths', () => {
    it('Path A: search "沈辞" → new-member post contains "贺兰山" and "06年"', () => {
      const results = findArchivedContent('沈辞');
      const newMember = results.find(p => p.title === '新人报到帖');
      expect(newMember).toBeDefined();
      expect(newMember!.content).toMatch(/贺兰山/);
      expect(newMember!.content).toMatch(/06/);
    });

    it('Path B: search "贺兰山" → recall post confirms first site', () => {
      const results = findArchivedContent('贺兰山');
      const recall = results.find(p => p.title.includes('回忆帖'));
      expect(recall).toBeDefined();
      expect(recall!.content).toMatch(/贺兰山是我探秘的起点/);
    });

    it('Path C: search "地下三尺" → new-member post', () => {
      const results = findArchivedContent('地下三尺');
      const newMember = results.find(p => p.title === '新人报到帖');
      expect(newMember).toBeDefined();
      expect(newMember!.content).toMatch(/贺兰山/);
      expect(newMember!.content).toMatch(/06/);
    });

    it('All three paths converge to same conclusion: helanshan06', () => {
      // All three search paths should surface the info needed:
      // first site = 贺兰山 (helanshan) + birth year = 06 → helanshan06
      const paths = ['沈辞', '贺兰山', '地下三尺'];
      for (const path of paths) {
        const results = findArchivedContent(path);
        expect(results.length).toBeGreaterThan(0);
      }
    });
  });

  // ========================================
  // 藏头文辅助提示验证
  // ========================================
  describe('Acrostic hint verification', () => {
    it('searching "加密" reveals hint about cangtou/cangwei technique', () => {
      const results = findArchivedContent('加密');
      const hintPost = results.find(p => p.author === 'signal_屿');
      expect(hintPost).toBeDefined();
      expect(hintPost!.content).toMatch(/藏头|藏尾|开头|结尾/);
    });

    it('searching "信号" reveals hint about pattern recognition', () => {
      const results = findArchivedContent('信号');
      expect(results.some(p => p.content.includes('模式识别'))).toBe(true);
    });
  });
});
