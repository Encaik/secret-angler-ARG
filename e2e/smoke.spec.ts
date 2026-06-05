// ========================================
// E2E: 关键页面可访问性冒烟测试
// 验证所有关键页面返回 200 且包含预期内容
// ========================================

import { test, expect } from '@playwright/test';

const PUBLIC_PAGES = [
  { url: '/', title: /秘境垂钓者|深空古迹|探秘者/ },
  { url: '/home/', title: /探秘者联盟|首页/ },
  { url: '/alien/', title: /外星/ },
  { url: '/ruins/', title: /古迹/ },
  { url: '/mystery/', title: /未解之谜/ },
  { url: '/urban-legend/', title: /都市传说/ },
  { url: '/nature/', title: /自然/ },
  { url: '/deep-sea/', title: /深海/ },
  { url: '/hollow-earth/', title: /地心/ },
  { url: '/community/', title: /社区/ },
  { url: '/guide/', title: /指南/ },
  { url: '/about/', title: /加入|关于/ },
  { url: '/links/', title: /友情|链接/ },
  { url: '/submit/', title: /投稿/ },
  { url: '/login/', title: /登录/ },
  { url: '/register/', title: /注册/ },
  { url: '/search/', title: /搜索/ },
  { url: '/404/', title: /404|未找到/ },
];

const COMMUNITY_POSTS = [
  '/community/post/241/',
  '/community/post/244/',
  '/community/post/246/',
  '/community/post/247/',
  '/community/post/248/',
  '/community/post/250/',
];

const USER_PAGES = [
  '/user/lyu/',
  '/user/shenci/',
  '/user/starwalker/',
  '/user/mountainwolf/',
  '/user/nebulax/',
  '/user/oldcat/',
  '/user/urbanwild/',
  '/user/urbexlf/',
  '/user/deephunter/',
  '/user/driftlang/',
];

const HIDDEN_PAGES = [
  '/trigger/rift/',
  '/trigger/stargate/',
  '/trigger/base/',
  '/hidden/panlongxia/',
  '/hidden/admin/',
  '/hidden/board/',
  '/hidden/operation/',
  '/hidden/locations/',
  '/hidden/dead-drop/',
  '/hidden/targets/',
  '/hidden/evidence-locker/',
];

const ENDING_PAGES = [
  '/ending/1/',
  '/ending/2/',
  '/ending/3/',
  '/ending/4/',
];

test.describe('Public page accessibility', () => {
  for (const { url, title } of PUBLIC_PAGES) {
    test(`${url} → returns 200 and title matches`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
    });
  }
});

test.describe('Community posts accessibility', () => {
  for (const url of COMMUNITY_POSTS) {
    test(`${url} → returns 200`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      // 每个帖文页面应有标题或正文
      const hasContent = await page.locator('h1, h2, p').first().isVisible();
      expect(hasContent).toBe(true);
    });
  }
});

test.describe('User pages accessibility', () => {
  for (const url of USER_PAGES) {
    test(`${url} → returns 200`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
    });
  }
});

test.describe('Hidden and trigger page accessibility', () => {
  for (const url of HIDDEN_PAGES) {
    test(`${url} → returns 200`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
    });
  }
});

test.describe('Ending page accessibility', () => {
  for (const url of ENDING_PAGES) {
    test(`${url} → returns 200`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
    });
  }
});

test.describe('Navigation links in nav bar', () => {
  test('all nav links are functional', async ({ page }) => {
    await page.goto('/home/');

    const navLinks = page.locator('.nav-links a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(8);

    // 检查至少前 4 个链接有有效的 href
    for (let i = 0; i < Math.min(count, 4); i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  test('nav brand link goes to home', async ({ page }) => {
    await page.goto('/alien/');
    const brandLink = page.locator('.nav-brand');
    const href = await brandLink.getAttribute('href');
    expect(href).toContain('home');
  });
});
