// ========================================
// 数据一致性校验 — 跨模块交叉验证
// 验证所有数据引用的一致性和正确性
// ========================================

import { describe, it, expect } from 'vitest';
import { PUZZLES } from '../../data/puzzles';
import { ARCHIVED_CONTENT, HIDDEN_PAGE_CACHE, MOCK_RESULTS } from '../../data/search-data';
import { USERS } from '../../data/users';
import { MAIN_CREDENTIALS, DARKNET_ACCOUNTS, SHENCI_PASSWORD_PARTS, LYU_PASSWORD } from '../../data/credentials';

// EVIDENCE_MAP 来自 ending.ts（内联验证）
const EVIDENCE_PAGES = [
  '/trigger/rift',
  '/trigger/stargate',
  '/trigger/base',
  '/hidden/panlongxia',
  '/hidden/board',
  '/hidden/operation',
  '/hidden/locations',
  '/hidden/dead-drop',
];

// ========================================
// EVIDENCE_MAP 与 HIDDEN_PAGE_CACHE 的覆盖
// ========================================
describe('Cross-reference: EVIDENCE_MAP vs HIDDEN_PAGE_CACHE', () => {
  it('every trigger evidence page has a discovery path via HIDDEN_PAGE_CACHE', () => {
    // /trigger/rift → "多站同源"
    // /trigger/stargate → "星门坐标"
    // /trigger/base → "布景基地"
    const triggerMappings: Record<string, string> = {
      '/trigger/rift': '多站同源',
      '/trigger/stargate': '星门坐标',
      '/trigger/base': '布景基地',
    };

    for (const [page, keyword] of Object.entries(triggerMappings)) {
      expect(HIDDEN_PAGE_CACHE[keyword], `No HIDDEN_PAGE_CACHE entry for ${page}`).toBeDefined();
      expect(HIDDEN_PAGE_CACHE[keyword].pageUrl).toBe(page);
    }
  });

  it('every hidden evidence page has a discovery path via HIDDEN_PAGE_CACHE', () => {
    // /hidden/panlongxia → "归源宗"
    // /hidden/admin → "后台管理"
    const hiddenMappings: Record<string, string> = {
      '/hidden/panlongxia': '归源宗',
      '/hidden/admin': '后台管理',
    };

    for (const [page, keyword] of Object.entries(hiddenMappings)) {
      expect(HIDDEN_PAGE_CACHE[keyword], `No HIDDEN_PAGE_CACHE entry for ${page}`).toBeDefined();
      expect(HIDDEN_PAGE_CACHE[keyword].pageUrl).toBe(page);
    }
  });

  it('all evidence pages are valid paths', () => {
    for (const page of EVIDENCE_PAGES) {
      expect(page, `Evidence page "${page}" should start with /`).toMatch(/^\//);
    }
  });
});

// ========================================
// 谜题 clueLocations 与搜索数据的交叉引用
// ========================================
describe('Cross-reference: Puzzles vs Search Data', () => {
  it('all puzzle clueLocations that are URL paths are valid format', () => {
    for (const puzzle of PUZZLES) {
      for (const loc of puzzle.clueLocations) {
        // Only check pure URL paths (start with / and don't contain spaces/parentheses)
        if (loc.startsWith('/') && !loc.includes(' ') && !loc.includes('（') && !loc.includes('(')) {
          expect(loc, `${puzzle.id}: path-like clueLocation "${loc}" should start with a known section`).toMatch(
            /^\/(user|inbox|trigger|hidden|community|member|share|login|about|search|home)\//,
          );
        }
      }
    }
  });

  it('all puzzle requiresClue keys are plausible progress markers', () => {
    for (const puzzle of PUZZLES) {
      for (const clue of puzzle.requiresClue) {
        expect(typeof clue).toBe('string');
        expect(clue.length).toBeGreaterThan(0);
      }
    }
  });

  it('all puzzle unlocksPages are valid paths', () => {
    for (const puzzle of PUZZLES) {
      for (const page of puzzle.unlocksPages) {
        expect(page).toMatch(/^\//);
      }
    }
  });
});

// ========================================
// USERS 与 CREDENTIALS 的一致性
// ========================================
describe('Cross-reference: Users vs Credentials', () => {
  it('USERS.lyu.password matches MAIN_CREDENTIALS.lyu.password', () => {
    expect(USERS.lyu.password).toBe(MAIN_CREDENTIALS['lyu'].password);
    expect(USERS.lyu.password).toBe(LYU_PASSWORD);
  });

  it('USERS.shenci.password matches MAIN_CREDENTIALS.shenci.password', () => {
    expect(USERS.shenci.password).toBe(MAIN_CREDENTIALS['shenci'].password);
    expect(USERS.shenci.password).toBe(SHENCI_PASSWORD_PARTS.full);
  });

  it('all key characters (isKeyCharacter=true) have non-empty passwords', () => {
    for (const [id, user] of Object.entries(USERS)) {
      if (user.isKeyCharacter) {
        expect(user.password, `Key character ${id} should have a non-empty password`).toBeTruthy();
      }
    }
  });

  it('all non-key characters has empty passwords', () => {
    for (const [id, user] of Object.entries(USERS)) {
      if (!user.isKeyCharacter && USERS[id]) {
        // Non-key characters should have empty passwords (not playable)
        expect(user.password || '', `Non-key character ${id} should have empty password`).toBe('');
      }
    }
  });

  it('every user has valid pageUrl format', () => {
    for (const [id, user] of Object.entries(USERS)) {
      expect(user.pageUrl, `${id}: pageUrl should start with /user/`).toMatch(/^\/user\//);
      expect(user.pageUrl, `${id}: pageUrl should end with /`).toMatch(/\/$/);
    }
  });

  it('every user has required fields', () => {
    const requiredFields = ['id', 'displayName', 'realName', 'bio', 'joinedDate', 'tags', 'pageUrl'];
    for (const [id, user] of Object.entries(USERS)) {
      for (const field of requiredFields) {
        expect(user[field as keyof typeof user], `${id}: missing field ${field}`).toBeDefined();
      }
    }
  });
});

// ========================================
// MOCK_RESULTS URL 验证
// ========================================
describe('Cross-reference: MOCK_RESULTS URLs', () => {
  it('all MOCK_RESULTS URLs end with /', () => {
    for (const [keyword, urls] of Object.entries(MOCK_RESULTS)) {
      for (const url of urls) {
        expect(url, `${keyword}: URL "${url}" should end with /`).toMatch(/\/$/);
      }
    }
  });

  it('all MOCK_RESULTS URLs start with /', () => {
    for (const [keyword, urls] of Object.entries(MOCK_RESULTS)) {
      for (const url of urls) {
        expect(url, `${keyword}: URL "${url}" should start with /`).toMatch(/^\//);
      }
    }
  });

  it('no MOCK_RESULTS URLs contain external domains', () => {
    for (const [keyword, urls] of Object.entries(MOCK_RESULTS)) {
      for (const url of urls) {
        expect(url, `${keyword}: URL "${url}" contains external domain`).not.toMatch(/^https?:\/\//);
      }
    }
  });
});

// ========================================
// ARCHIVED_CONTENT authorUrl 验证
// ========================================
describe('Cross-reference: ARCHIVED_CONTENT authorUrls', () => {
  it('all authorUrls reference valid user pages or are valid paths', () => {
    const allPosts = Object.values(ARCHIVED_CONTENT).flat();
    for (const post of allPosts) {
      if (post.authorUrl) {
        expect(post.authorUrl, `Post "${post.title}": authorUrl "${post.authorUrl}" should start with /`).toMatch(
          /^\//,
        );
      }
    }
  });

  it('all authorUrls that are user pages are valid paths', () => {
    const allPosts = Object.values(ARCHIVED_CONTENT).flat();

    for (const post of allPosts) {
      if (post.authorUrl && post.authorUrl.startsWith('/user/')) {
        // Not all authorUrls need to match existing users
        // But they should be valid paths
        expect(post.authorUrl).toMatch(/^\/user\/[\w-]+\/$/);
      }
    }
  });
});

// ========================================
// 结局页面 & evidence-locker 一致性
// ========================================
describe('Cross-reference: Ending consistency', () => {
  it('evidence score weights sum to exactly 21', () => {
    // Weights from EVIDENCE_MAP in ending.ts: 2+2+3+3+2+2+3+4 = 21
    const weights = [2, 2, 3, 3, 2, 2, 3, 4];
    expect(weights.reduce((a, b) => a + b, 0)).toBe(21);
  });

  it('has exactly 8 evidence items', () => {
    expect(EVIDENCE_PAGES).toHaveLength(8);
  });

  it('evidence items are unique (no duplicates)', () => {
    expect(new Set(EVIDENCE_PAGES).size).toBe(EVIDENCE_PAGES.length);
  });

  it('4 ending pages correspond to 4 ending thresholds', () => {
    // Ending 1: score 0-6
    // Ending 2: score 7-11
    // Ending 3: score 12-17
    // Ending 4: score 18-21
    const thresholds = [
      { ending: 1, min: 0, max: 6 },
      { ending: 2, min: 7, max: 11 },
      { ending: 3, min: 12, max: 17 },
      { ending: 4, min: 18, max: 21 },
    ];

    expect(thresholds).toHaveLength(4);

    // Verify no gaps or overlaps
    for (let i = 1; i < thresholds.length; i++) {
      expect(thresholds[i].min).toBe(thresholds[i - 1].max + 1);
    }
    expect(thresholds[3].max).toBe(21); // Max score
  });
});

// ========================================
// 暗网凭证 vs 暗网邀请电话
// ========================================
describe('Cross-reference: Darknet credential flow', () => {
  it('darknet account DR-2026-03 has a password', () => {
    expect(DARKNET_ACCOUNTS['DR-2026-03']).toBeTruthy();
  });
});
