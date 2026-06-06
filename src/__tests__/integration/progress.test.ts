// ========================================
// 进度系统集成测试
// 测试 localStorage 进度读写函数
// ========================================

import { describe, it, expect, beforeEach } from 'vitest';
import '../../scripts/progress'; // 副作用导入，函数挂载到 window
import { createEmptyProgress, seedProgress, readProgress } from '../helpers';

const { getProgress, saveProgress, recordPageVisit, updateExplorationProgress } = window as any;

describe('getProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default progress when localStorage is empty', () => {
    const progress = getProgress();
    expect(progress.currentStage).toBe(1);
    expect(progress.discoveredPages).toEqual([window.location.pathname]);
    expect(progress.discoveredClues).toEqual([]);
    expect(progress.solvedPuzzles).toEqual({});
    expect(progress.explorationProgress).toBe(0);
    expect(progress.ending).toBe(null);
    expect(progress.playerTargeted).toBe(false);
    expect(progress.startedAt).toBeGreaterThan(0);
  });

  it('returns stored progress when localStorage has data', () => {
    const seeded = createEmptyProgress({
      currentStage: 3,
      discoveredPages: ['/a/', '/b/'],
    });
    seedProgress(seeded);

    const loaded = getProgress();
    expect(loaded.currentStage).toBe(3);
    expect(loaded.discoveredPages).toEqual(['/a/', '/b/']);
  });

  it('has all required fields in default state', () => {
    const progress = getProgress();
    expect(progress).toHaveProperty('discoveredPages');
    expect(progress).toHaveProperty('discoveredClues');
    expect(progress).toHaveProperty('solvedPuzzles');
    expect(progress).toHaveProperty('explorationProgress');
    expect(progress).toHaveProperty('currentStage');
    expect(progress).toHaveProperty('hasFullEvidence');
    expect(progress).toHaveProperty('hasAlertedPolice');
    expect(progress).toHaveProperty('hasRescuedRoommate');
    expect(progress).toHaveProperty('playerTargeted');
    expect(progress).toHaveProperty('ending');
    expect(progress).toHaveProperty('startedAt');
  });
});

describe('saveProgress / getProgress round-trip', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists and retrieves all fields correctly', () => {
    const original = createEmptyProgress({
      currentStage: 5,
      discoveredPages: ['/a/', '/b/', '/c/'],
      solvedPuzzles: { puzzle1: true, puzzle2: false },
      explorationProgress: 65,
      playerTargeted: true,
    });
    saveProgress(original);

    const loaded = readProgress();
    expect(loaded.currentStage).toBe(5);
    expect(loaded.discoveredPages).toEqual(['/a/', '/b/', '/c/']);
    expect(loaded.solvedPuzzles).toEqual({ puzzle1: true, puzzle2: false });
    expect(loaded.explorationProgress).toBe(65);
    expect(loaded.playerTargeted).toBe(true);
  });

  it('handles progress with many discoveredPages', () => {
    const pages = Array.from({ length: 50 }, (_, i) => `/page/${i}/`);
    const original = createEmptyProgress({ discoveredPages: pages });
    saveProgress(original);

    const loaded = readProgress();
    expect(loaded.discoveredPages).toHaveLength(50);
  });
});

describe('recordPageVisit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds new URL to discoveredPages', () => {
    seedProgress(createEmptyProgress({ discoveredPages: ['/a/'] }));
    recordPageVisit('/b/');

    const progress = readProgress();
    expect(progress.discoveredPages).toContain('/b/');
  });

  it('does not duplicate already-visited URLs', () => {
    seedProgress(createEmptyProgress({ discoveredPages: ['/a/'] }));
    recordPageVisit('/a/');
    recordPageVisit('/a/');

    const progress = readProgress();
    const count = progress.discoveredPages.filter((p) => p === '/a/').length;
    expect(count).toBe(1);
  });

  it('sets playerTargeted after 4 hidden/trigger pages visited', () => {
    seedProgress(
      createEmptyProgress({
        discoveredPages: ['/hidden/a/', '/hidden/b/', '/trigger/a/'],
        playerTargeted: false,
      }),
    );

    // 4th hidden/trigger page
    recordPageVisit('/hidden/c/');

    const progress = readProgress();
    expect(progress.playerTargeted).toBe(true);
  });

  it('does not set playerTargeted with only 3 hidden/trigger pages', () => {
    seedProgress(
      createEmptyProgress({
        discoveredPages: ['/hidden/a/', '/hidden/b/'],
        playerTargeted: false,
      }),
    );

    recordPageVisit('/trigger/a/');

    const progress = readProgress();
    expect(progress.playerTargeted).toBe(false);
  });

  it('does not set playerTargeted for non-hidden pages', () => {
    seedProgress(
      createEmptyProgress({
        discoveredPages: ['/home/', '/about/', '/community/'],
        playerTargeted: false,
      }),
    );

    recordPageVisit('/links/');

    const progress = readProgress();
    expect(progress.playerTargeted).toBe(false);
  });

  it('updates explorationProgress after recording', () => {
    seedProgress(createEmptyProgress({ explorationProgress: 0 }));
    recordPageVisit('/hidden/a/');

    const progress = readProgress();
    expect(progress.explorationProgress).toBeGreaterThan(0);
  });
});

describe('updateExplorationProgress', () => {
  it('empty progress has low percentage', () => {
    const progress = createEmptyProgress();
    updateExplorationProgress(progress);
    // Pages component: (0/40)*60 = 0, no bonuses → 0
    expect(progress.explorationProgress).toBe(0);
  });

  it('calculates progress based on discoveredPages count', () => {
    const progress = createEmptyProgress({
      discoveredPages: Array.from({ length: 10 }, (_, i) => `/page/${i}/`),
    });
    updateExplorationProgress(progress);
    // (10/40)*60 = 15, no bonuses
    expect(progress.explorationProgress).toBe(15);
  });

  it('adds bonus for hidden/trigger/member pages (2% each)', () => {
    const progress = createEmptyProgress({
      discoveredPages: ['/page/1/', '/hidden/a/', '/trigger/b/', '/member/c/'],
    });
    updateExplorationProgress(progress);
    // Pages: (4/40)*60 = 6, Hidden bonus: 3 * 2 = 6, Total: 12
    expect(progress.explorationProgress).toBe(12);
  });

  it('adds bonus for solved puzzles (5% each)', () => {
    const progress = createEmptyProgress({
      solvedPuzzles: { a: true, b: true, c: true },
    });
    updateExplorationProgress(progress);
    // Pages: (0/40)*60 = 0, Puzzle bonus: 3 * 5 = 15
    expect(progress.explorationProgress).toBe(15);
  });

  it('caps at 100%', () => {
    const progress = createEmptyProgress({
      discoveredPages: Array.from({ length: 80 }, (_, i) => `/page/${i}/`),
      solvedPuzzles: { a: true, b: true, c: true, d: true, e: true },
    });
    updateExplorationProgress(progress);
    expect(progress.explorationProgress).toBeLessThanOrEqual(100);
  });

  it('max-page stage (40 pages, no bonuses) = 60%', () => {
    const progress = createEmptyProgress({
      discoveredPages: Array.from({ length: 40 }, (_, i) => `/page/${i}/`),
    });
    updateExplorationProgress(progress);
    expect(progress.explorationProgress).toBe(60);
  });
});
