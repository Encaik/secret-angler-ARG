// ========================================
// E2E: 隐藏页面门控与进度管理测试
// ========================================

import { test, expect } from '@playwright/test';

test.describe('Hidden page gating', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });

  test('hidden pages have noindex meta tag', async ({ page }) => {
    // 直接导航到隐藏页面（这些页面本身不需要登录即可访问 URL，
    // 但应通过 robots meta 阻止搜索引擎索引）
    await page.goto('/hidden/admin/');
    const metaRobots = page.locator('meta[name="robots"]');
    await expect(metaRobots).toHaveAttribute('content', /noindex/);
  });

  test('ending pages have noindex meta tag', async ({ page }) => {
    await page.goto('/ending/1/');
    const metaRobots = page.locator('meta[name="robots"]');
    await expect(metaRobots).toHaveAttribute('content', /noindex/);
  });

  test('trigger pages have noindex meta tag', async ({ page }) => {
    await page.goto('/trigger/rift/');
    const metaRobots = page.locator('meta[name="robots"]');
    await expect(metaRobots).toHaveAttribute('content', /noindex/);
  });

  test('public pages do NOT have noindex', async ({ page }) => {
    await page.goto('/home/');
    const metaRobots = page.locator('meta[name="robots"]');
    await expect(metaRobots).toHaveCount(0);
  });
});

test.describe('Progress and localStorage', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.goto('/home/');
  });

  test('page visit records progress', async ({ page }) => {
    // 访问首页会自动记录访问
    const progress = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('arg_progress') || '{}')
    );
    expect(progress.discoveredPages).toBeDefined();
    expect(progress.discoveredPages.length).toBeGreaterThan(0);
    expect(progress.currentStage).toBe(1);
  });

  test('exploration progress increases on hidden page visit', async ({ page }) => {
    // 先获取初始进度
    const before = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('arg_progress') || '{}')
    );

    // 访问隐藏页面
    await page.goto('/trigger/rift/');

    const after = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('arg_progress') || '{}')
    );
    expect(after.explorationProgress).toBeGreaterThan(
      before.explorationProgress || 0
    );
  });

  test('progress persists across page navigations', async ({ page }) => {
    await page.goto('/alien/');
    await page.goto('/ruins/');

    const progress = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('arg_progress') || '{}')
    );
    // 应记录了 2+ 个页面访问
    const visited = progress.discoveredPages || [];
    expect(visited.length).toBeGreaterThanOrEqual(2);
  });

  test('arg_progress is stored in localStorage with correct key', async ({ page }) => {
    const progress = await page.evaluate(() =>
      localStorage.getItem('arg_progress')
    );
    expect(progress).toBeTruthy();
    const parsed = JSON.parse(progress!);
    expect(parsed).toHaveProperty('discoveredPages');
    expect(parsed).toHaveProperty('explorationProgress');
    expect(parsed).toHaveProperty('currentStage');
    expect(parsed).toHaveProperty('solvedPuzzles');
  });
});
