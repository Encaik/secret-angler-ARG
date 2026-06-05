// ========================================
// 测试全局设置 — jsdom 环境 + localStorage + window mock
// 所有测试文件运行前自动执行
// ========================================

import { vi, beforeEach } from 'vitest';

// 确保 window.__BASE__ 可用（ending.ts 中 getEndingUrl 使用）
// jsdom 提供 window 对象，但我们需要添加自定义属性
Object.defineProperty(window, '__BASE__', {
  value: '/',
  writable: true,
  configurable: true,
});

// Mock window.open（search.ts 使用）
window.open = vi.fn() as any;

// 确保每次测试前 localStorage 是干净的
beforeEach(() => {
  localStorage.clear();
  window.open = vi.fn() as any;
});
