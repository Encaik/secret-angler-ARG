// ========================================
// E2E: 登录态与用户界面切换测试
// ========================================

import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  test.beforeEach(async ({ page }) => {
    // 每个测试前清空 localStorage
    await page.goto('/home/');
    await page.evaluate(() => localStorage.clear());
  });

  test('login page loads with form fields', async ({ page }) => {
    await page.goto('/login/');
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-btn')).toBeVisible();
  });

  test('lyu login redirects to user center', async ({ page }) => {
    await page.goto('/login/');
    await page.fill('#username', 'lyu');
    await page.fill('#password', 'starchaser24');
    await page.click('#login-btn');

    // 应跳转到林屿个人中心
    await page.waitForURL(/\/user\/center\/lyu\//, { timeout: 5000 });
    await expect(page.locator('h1, h2').first()).toContainText(/signal_屿|林屿|lyu/i);
  });

  test('shenci login redirects to user center', async ({ page }) => {
    await page.goto('/login/');
    await page.fill('#username', 'shenci');
    await page.fill('#password', 'helanshan06');
    await page.click('#login-btn');

    await page.waitForURL(/\/user\/center\/shenci\//, { timeout: 5000 });
    await expect(page.locator('h1, h2').first()).toContainText(/地下三尺|沈辞|shenci/i);
  });

  test('wrong password shows error', async ({ page }) => {
    await page.goto('/login/');
    await page.fill('#username', 'lyu');
    await page.fill('#password', 'wrongpass');
    await page.click('#login-btn');

    // 应显示错误提示
    await expect(page.locator('#login-error')).toBeVisible({ timeout: 3000 });
  });

  test('nav bar shows display name after login', async ({ page }) => {
    // 用 JS 模拟登录态（跳过登录表单测试）
    await page.evaluate(() => {
      localStorage.setItem('arg_logged_in', 'true');
      localStorage.setItem('arg_username', 'lyu');
    });
    await page.goto('/home/');

    // 导航栏应显示显示名
    await expect(page.locator('#nav-user-name')).toContainText('signal_屿');
  });

  test('logout clears session', async ({ page }) => {
    // 设置登录态
    await page.evaluate(() => {
      localStorage.setItem('arg_logged_in', 'true');
      localStorage.setItem('arg_username', 'lyu');
    });
    await page.goto('/home/');

    // 点击下拉箭头
    await page.locator('#nav-user-arrow').click();
    // 点击退出登录
    const logoutBtn = page.locator('[data-action="logout"]');
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();

    // 验证清除了登录态并跳转到登录页
    await page.waitForURL(/\/login\//, { timeout: 5000 });
    const loggedIn = await page.evaluate(() =>
      localStorage.getItem('arg_logged_in')
    );
    expect(loggedIn).toBeNull();
  });
});
