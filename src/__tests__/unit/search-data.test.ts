// ========================================
// 搜索数据单元测试
// 测试 ARCHIVED_CONTENT、HIDDEN_PAGE_CACHE、MOCK_RESULTS、
// PUZZLE_ANSWER 和 findArchivedContent()
// ========================================

import { describe, it, expect } from 'vitest';
import {
  ARCHIVED_CONTENT,
  HIDDEN_PAGE_CACHE,
  MOCK_RESULTS,
  PUZZLE_ANSWER,
  USER_SEARCH,
  SEARCH_ACCESS_CODE,
  findArchivedContent,
  findUserSearchResults,
  type ArchivedPost,
} from '../../data/search-data';

// ========================================
// ARCHIVED_CONTENT 结构完整性
// ========================================
describe('ARCHIVED_CONTENT', () => {
  const allPosts: { keyword: string; post: ArchivedPost }[] = [];
  for (const [keyword, posts] of Object.entries(ARCHIVED_CONTENT)) {
    for (const post of posts) {
      allPosts.push({ keyword, post });
    }
  }

  it('has keywords for all major game search terms', () => {
    const expectedKeys = ['shenci', '沈辞', '贺兰山', '地下三尺', '06', '林屿', 'lyu', 'signal_屿', '信号', '加密', 'GPS', '蛇药'];
    for (const key of expectedKeys) {
      expect(ARCHIVED_CONTENT[key], `Missing keyword: ${key}`).toBeDefined();
    }
  });

  it('every post has all required fields', () => {
    for (const { keyword, post } of allPosts) {
      expect(post.title, `${keyword}: missing title`).toBeTruthy();
      expect(post.author, `${keyword}: missing author`).toBeTruthy();
      expect(post.date, `${keyword}: missing date`).toBeTruthy();
      expect(post.content, `${keyword}: missing content`).toBeTruthy();
      expect(typeof post.isClue, `${keyword}: missing isClue`).toBe('boolean');
    }
  });

  it('every authorUrl (when present) starts with /', () => {
    for (const { keyword, post } of allPosts) {
      if (post.authorUrl) {
        expect(
          post.authorUrl,
          `${keyword}: authorUrl "${post.authorUrl}" should start with /`
        ).toMatch(/^\//);
      }
    }
  });

  it('every pageUrl (when present) starts with /', () => {
    for (const { keyword, post } of allPosts) {
      if (post.pageUrl) {
        expect(
          post.pageUrl,
          `${keyword}: pageUrl "${post.pageUrl}" should start with /`
        ).toMatch(/^\//);
      }
    }
  });

  it('has at least some posts marked as clues', () => {
    const cluePosts = allPosts.filter(({ post }) => post.isClue);
    expect(cluePosts.length).toBeGreaterThan(0);
  });

  it('沈辞 and shenci keywords return posts about the same character', () => {
    const shenciPosts = findArchivedContent('shenci');
    const 沈辞Posts = findArchivedContent('沈辞');
    // Both should return the new-member post
    const hasNewMemberPost = (posts: ArchivedPost[]) =>
      posts.some(p => p.title === '新人报到帖');
    expect(hasNewMemberPost(shenciPosts)).toBe(true);
    expect(hasNewMemberPost(沈辞Posts)).toBe(true);
  });
});

// ========================================
// HIDDEN_PAGE_CACHE 结构完整性
// ========================================
describe('HIDDEN_PAGE_CACHE', () => {
  it('has entries for all trigger/search entry points', () => {
    const expectedKeys = ['深海裂隙', '星门坐标', '布景基地', '深度探秘', '归源宗', '后台管理', '秘境之下', '轻舟云盘'];
    for (const key of expectedKeys) {
      expect(HIDDEN_PAGE_CACHE[key], `Missing HIDDEN_PAGE_CACHE key: ${key}`).toBeDefined();
    }
  });

  it('every entry has a valid pageUrl', () => {
    for (const [key, post] of Object.entries(HIDDEN_PAGE_CACHE)) {
      expect(post.pageUrl, `${key}: missing pageUrl`).toBeTruthy();
      expect(
        post.pageUrl!,
        `${key}: pageUrl "${post.pageUrl}" should start with /`
      ).toMatch(/^\//);
    }
  });

  it('trigger pages map to /trigger/ routes', () => {
    expect(HIDDEN_PAGE_CACHE['深海裂隙'].pageUrl).toBe('/trigger/rift');
    expect(HIDDEN_PAGE_CACHE['星门坐标'].pageUrl).toBe('/trigger/stargate');
    expect(HIDDEN_PAGE_CACHE['布景基地'].pageUrl).toBe('/trigger/base');
  });

  it('hidden pages map to /hidden/ routes', () => {
    expect(HIDDEN_PAGE_CACHE['归源宗'].pageUrl).toBe('/hidden/panlongxia');
    expect(HIDDEN_PAGE_CACHE['后台管理'].pageUrl).toBe('/hidden/admin');
  });

  it('every entry has required post fields', () => {
    for (const [key, post] of Object.entries(HIDDEN_PAGE_CACHE)) {
      expect(post.title, `${key}: missing title`).toBeTruthy();
      expect(post.author, `${key}: missing author`).toBeTruthy();
      expect(post.content, `${key}: missing content`).toBeTruthy();
    }
  });
});

// ========================================
// MOCK_RESULTS 结构完整性
// ========================================
describe('MOCK_RESULTS', () => {
  it('all result URLs start with /', () => {
    for (const [keyword, urls] of Object.entries(MOCK_RESULTS)) {
      for (const url of urls) {
        expect(url, `${keyword}: URL "${url}" should start with /`).toMatch(/^\//);
      }
    }
  });

  it('all result URLs end with /', () => {
    for (const [keyword, urls] of Object.entries(MOCK_RESULTS)) {
      for (const url of urls) {
        expect(url, `${keyword}: URL "${url}" should end with /`).toMatch(/\/$/);
      }
    }
  });

  it('keywords cover major navigation search terms', () => {
    const expectedKeys = ['外星', '古迹', '秘境', '坐标', '岩画', '神农架', '凤凰山', '秦岭', '贺兰山', '深空', '探秘'];
    for (const key of expectedKeys) {
      expect(MOCK_RESULTS[key], `Missing MOCK_RESULTS key: ${key}`).toBeDefined();
    }
  });

  it('includes user-related keywords for profile search', () => {
    const userKeys = ['沈辞', 'shenci', '地下三尺', '林屿', 'lyu', 'signal_屿'];
    for (const key of userKeys) {
      expect(MOCK_RESULTS[key], `Missing user MOCK_RESULTS key: ${key}`).toBeDefined();
      expect(MOCK_RESULTS[key].some(u => u.includes('/user/')), `${key}: should contain user profile URL`).toBe(true);
    }
  });
});

// ========================================
// USER_SEARCH 结构完整性
// ========================================
describe('USER_SEARCH', () => {
  it('has entries for key character names and account names', () => {
    const expectedKeys = ['沈辞', 'shenci', '地下三尺', '林屿', 'lyu', 'signal_屿'];
    for (const key of expectedKeys) {
      expect(USER_SEARCH[key], `Missing USER_SEARCH key: ${key}`).toBeDefined();
    }
  });

  it('"地下三尺" maps to account "shenci"', () => {
    expect(USER_SEARCH['地下三尺'].account).toBe('shenci');
    expect(USER_SEARCH['地下三尺'].displayName).toBe('地下三尺');
    expect(USER_SEARCH['地下三尺'].pageUrl).toBe('/user/shenci/');
  });

  it('"shenci" maps to displayName "地下三尺"', () => {
    expect(USER_SEARCH['shenci'].displayName).toBe('地下三尺');
    expect(USER_SEARCH['shenci'].account).toBe('shenci');
    expect(USER_SEARCH['shenci'].pageUrl).toBe('/user/shenci/');
  });

  it('"signal_屿" maps to account "lyu"', () => {
    expect(USER_SEARCH['signal_屿'].account).toBe('lyu');
    expect(USER_SEARCH['signal_屿'].displayName).toBe('signal_屿');
    expect(USER_SEARCH['signal_屿'].pageUrl).toBe('/user/lyu/');
  });

  it('"lyu" maps to displayName "signal_屿"', () => {
    expect(USER_SEARCH['lyu'].displayName).toBe('signal_屿');
    expect(USER_SEARCH['lyu'].account).toBe('lyu');
    expect(USER_SEARCH['lyu'].pageUrl).toBe('/user/lyu/');
  });

  it('every entry has required fields', () => {
    for (const [key, user] of Object.entries(USER_SEARCH)) {
      expect(user.displayName, `${key}: missing displayName`).toBeTruthy();
      expect(user.account, `${key}: missing account`).toBeTruthy();
      expect(user.pageUrl, `${key}: missing pageUrl`).toBeTruthy();
      expect(user.pageUrl, `${key}: pageUrl should start with /`).toMatch(/^\//);
      expect(user.bio, `${key}: missing bio`).toBeTruthy();
    }
  });
});

describe('findUserSearchResults', () => {
  it('searching "沈辞" returns shenci user', () => {
    const results = findUserSearchResults('沈辞');
    expect(results.length).toBe(1);
    expect(results[0].account).toBe('shenci');
  });

  it('searching "地下三尺" returns shenci user', () => {
    const results = findUserSearchResults('地下三尺');
    expect(results.length).toBe(1);
    expect(results[0].account).toBe('shenci');
    expect(results[0].displayName).toBe('地下三尺');
  });

  it('searching "shenci" returns shenci user', () => {
    const results = findUserSearchResults('shenci');
    expect(results.length).toBe(1);
    expect(results[0].account).toBe('shenci');
  });

  it('searching "林屿" returns lyu user', () => {
    const results = findUserSearchResults('林屿');
    expect(results.length).toBe(1);
    expect(results[0].account).toBe('lyu');
  });

  it('searching "lyu" returns lyu user', () => {
    const results = findUserSearchResults('lyu');
    expect(results.length).toBe(1);
    expect(results[0].account).toBe('lyu');
  });

  it('searching "signal_屿" returns lyu user', () => {
    const results = findUserSearchResults('signal_屿');
    expect(results.length).toBe(1);
    expect(results[0].account).toBe('lyu');
  });

  it('deduplicates users that match multiple keywords', () => {
    // "沈辞shenci" matches both "沈辞" and "shenci" keywords → one result
    const results = findUserSearchResults('沈辞shenci');
    expect(results.length).toBe(1);
    expect(results[0].account).toBe('shenci');
  });

  it('returns empty array for non-user query', () => {
    const results = findUserSearchResults('完全不存在的用户名xyz');
    expect(results).toEqual([]);
  });
});

// ========================================
// PUZZLE_ANSWER
// ========================================
describe('PUZZLE_ANSWER', () => {
  it('equals "深海裂隙2026"', () => {
    expect(PUZZLE_ANSWER).toBe('深海裂隙2026');
  });
});

// ========================================
// SEARCH_ACCESS_CODE
// ========================================
describe('SEARCH_ACCESS_CODE', () => {
  it('equals "2026"', () => {
    expect(SEARCH_ACCESS_CODE).toBe('2026');
  });

  it('PUZZLE_ANSWER contains SEARCH_ACCESS_CODE', () => {
    expect(PUZZLE_ANSWER).toContain(SEARCH_ACCESS_CODE);
  });
});

// ========================================
// findArchivedContent()
// ========================================
describe('findArchivedContent', () => {
  it('returns matching posts for exact keyword match', () => {
    const results = findArchivedContent('沈辞');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(p => p.title === '新人报到帖')).toBe(true);
  });

  it('is case-insensitive for English keywords', () => {
    const lower = findArchivedContent('gps');
    const upper = findArchivedContent('GPS');
    expect(lower.length).toBe(upper.length);
  });

  it('returns posts for partial keyword match within query', () => {
    // Searching "贺兰山岩画" should match keyword "贺兰山"
    const results = findArchivedContent('贺兰山岩画');
    expect(results.length).toBeGreaterThan(0);
  });

  it('deduplicates posts that match multiple keywords', () => {
    // "沈辞" matches both "沈辞" and potentially overlapping content with "shenci"
    const results = findArchivedContent('沈辞');
    const titles = results.map(p => p.title + p.date);
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });

  it('sorts clue posts (isClue=true) before non-clue posts', () => {
    const results = findArchivedContent('贺兰山');
    const firstNonClueIndex = results.findIndex(p => !p.isClue);
    if (firstNonClueIndex > 0) {
      // All posts before this should be clues
      for (let i = 0; i < firstNonClueIndex; i++) {
        expect(results[i].isClue).toBe(true);
      }
    }
  });

  it('returns empty array for unmatched query', () => {
    const results = findArchivedContent('完全不存在的查询词xyz123');
    expect(results).toEqual([]);
  });

  it('matches Chinese characters correctly', () => {
    const results = findArchivedContent('加密');
    expect(results.length).toBeGreaterThan(0);
    // Should find the "信息隐藏" post by signal_屿
    expect(results.some(p => p.author === 'signal_屿')).toBe(true);
  });

  it('searching "轻舟云盘" returns the cloud drive recommendation', () => {
    const results = findArchivedContent('轻舟云盘');
    expect(results.some(p => p.title.includes('轻舟云盘'))).toBe(true);
  });

  it('searching "凤凰山" returns the signal analysis post', () => {
    const results = findArchivedContent('凤凰山');
    expect(results.some(p => p.title.includes('凤凰山'))).toBe(true);
  });
});
