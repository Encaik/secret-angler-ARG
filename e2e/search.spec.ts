// ========================================
// E2E: 搜索功能端到端测试
// ========================================

import { test, expect } from '@playwright/test';

test.describe('Search functionality', () => {
  test('navigation search opens search results page', async ({ page }) => {
    await page.goto('/home/');

    // 在导航栏搜索框中输入
    const searchInput = page.locator('#search-input');
    await searchInput.fill('沈辞');
    await page.click('#search-btn');

    // 应打开搜索结果页（新标签）
    const newPage = await page.waitForEvent('popup', { timeout: 5000 });
    await expect(newPage).toHaveURL(/\/search\/\?q=/);

    // 检查搜索结果
    const resultsList = newPage.locator('#search-results-list');
    await expect(resultsList).toContainText('贺兰山');
  });

  test('search result page shows placeholder when no query', async ({ page }) => {
    await page.goto('/search/');
    await expect(page.locator('#search-status')).toContainText('请输入关键词');
  });

  test('empty search term shows no results', async ({ page }) => {
    await page.goto('/search/?q=zzzz99');
    await expect(page.locator('#search-status')).toContainText('未找到');
  });

  test('search "加密" reveals hidden content hint', async ({ page }) => {
    await page.goto('/search/?q=加密');
    const results = page.locator('#search-results-list');
    await expect(results).toContainText('signal_屿');
    await expect(results).toContainText('藏头');
  });

  test('puzzle answer "深海裂隙2026" unlocks member access', async ({ page }) => {
    // 清空进度
    await page.evaluate(() => localStorage.clear());

    // 搜索谜题答案
    await page.goto('/search/?q=深海裂隙2026');

    // 验证进度已解锁
    const progress = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('arg_progress') || '{}')
    );
    expect(progress.solvedPuzzles?.stage1_page_header_password).toBe(true);
  });

  test('search "归源宗" shows hidden page cache entry', async ({ page }) => {
    await page.goto('/search/?q=归源宗');
    const results = page.locator('#search-results-list');
    await expect(results).toContainText('功德流通处');
  });

  test('search "深海裂隙" returns cache entry with trigger link', async ({ page }) => {
    await page.goto('/search/?q=深海裂隙');
    const results = page.locator('#search-results-list');
    await expect(results).toContainText('内部系统操作日志');
    // 缓存条目应包含可点击链接到 /trigger/rift
    const riftLink = results.locator('a[href*="trigger/rift"]');
    await expect(riftLink.first()).toBeVisible();
  });

  test('suggested search links work on empty query page', async ({ page }) => {
    await page.goto('/search/');
    // 推荐搜索链接
    const link = page.locator('a[href*="search/?q=沈辞"]').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/search\/\?q=/);
  });
});
