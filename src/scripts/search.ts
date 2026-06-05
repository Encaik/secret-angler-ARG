// ========================================
// 搜索脚本 — 关键词触发 + 进度追踪
// 在 Layout 中加载，所有页面共用
// 搜索行为：跳转到独立搜索页 /search/?q=xxx
// ========================================

// BASE 路径前缀，从 window.__BASE__ 读取（由 Layout head 中 define:vars 脚本注入）
const BASE: string = (window as any).__BASE__ || '/';

// 进度追踪函数从独立模块导入（通过 <script> 标签加载，函数在全局可用）
// GameProgress 接口、getProgress、saveProgress、recordPageVisit、updateExplorationProgress
// 定义在 src/scripts/progress.ts 中，由 Layout 同步加载

// ========================================
// 搜索处理
// ========================================

function handleSearch(query: string): void {
  const trimmed = query.trim();
  if (!trimmed) return;

  // 所有搜索 → 跳转到独立搜索页（包含历史存档 + 隐藏页面缓存）
  // 搜索只搜索本站内容，不直接跳转到其他网站
  // 跨站访问（如云盘）通过页面中的超链接实现
  window.open(`${BASE}search/?q=${encodeURIComponent(trimmed)}`, '_blank');
}

// ========================================
// 初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  getProgress();
  recordPageVisit(window.location.pathname);

  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      handleSearch(searchInput.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSearch(searchInput.value);
      }
    });
  }
});
