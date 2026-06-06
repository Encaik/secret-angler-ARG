// ========================================
// 导航栏用户区渲染
// 从 Layout.astro 内联 script 提取，所有公开页面共用
// 使用 CSS 类名而非硬编码 style，与 Layout.astro <style> 块同步
//
// 注意：此文件不使用 export 关键词。
// 原因同 progress.ts — Astro/Vite 将多个 script 标签分别处理，
// 使用 export 会使函数成为 ES 模块导出而非全局变量，
// 导致 Layout.astro 内联 <script> 中的 initNavUserArea() 调用抛出 ReferenceError。
// ========================================

const DISPLAY_NAMES: Record<string, string> = {
  lyu: 'signal_屿',
  shenci: '地下三尺',
};

function initNavUserArea(BASE: string): void {
  const area = document.getElementById('nav-user-area');
  if (!area) return;

  const loggedIn = localStorage.getItem('arg_logged_in') === 'true';
  const username = localStorage.getItem('arg_username');
  const displayName = (username && DISPLAY_NAMES[username]) || username || '';

  if (!loggedIn || !username) return;

  const menuItems = [
    { label: '个人中心', href: BASE + 'user/center/' + username + '/' },
    { label: '私信箱', href: BASE + 'inbox/' + username + '/' },
    { label: '退出登录', href: '#', action: 'logout' },
  ];

  const menuHTML = menuItems
    .map((item) => {
      const cls = item.action === 'logout' ? 'nu-item nu-logout' : 'nu-item';
      const dataAttr = item.action === 'logout' ? 'data-action="logout"' : `data-href="${item.href}"`;
      return `<span class="${cls}" ${dataAttr}>${item.label}</span>`;
    })
    .join('');

  area.innerHTML = `
    <span id="nav-user-name" class="nav-user-name">${displayName}</span>
    <span id="nav-user-arrow" class="nav-user-arrow">▾</span>
    <div id="nav-dropdown" class="nav-dropdown" style="display:none;">
      ${menuHTML}
    </div>
  `;

  const userName = document.getElementById('nav-user-name')!;
  const arrowEl = document.getElementById('nav-user-arrow')!;
  const dropdown = document.getElementById('nav-dropdown')!;

  // 用户名点击 → 个人中心
  userName.addEventListener('click', () => {
    window.open(BASE + 'user/center/', '_blank');
  });

  // 箭头点击 → 切换下拉
  arrowEl.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });

  // 下拉菜单项
  dropdown.querySelectorAll('[data-href]').forEach((item) => {
    const el = item as HTMLElement;
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const href = el.dataset.href;
      if (href) window.open(href, '_blank');
    });
  });

  // 退出登录
  const logoutItem = dropdown.querySelector('[data-action="logout"]') as HTMLElement;
  if (logoutItem) {
    logoutItem.addEventListener('click', () => {
      localStorage.removeItem('arg_logged_in');
      localStorage.removeItem('arg_username');
      window.location.href = BASE + 'login/';
    });
  }
}

// 挂载到 window 供 Layout.astro 内联 <script> 调用
if (typeof window !== 'undefined') {
  (window as any).initNavUserArea = initNavUserArea;

  // 页面加载后自动初始化导航栏用户区
  document.addEventListener('DOMContentLoaded', () => {
    const BASE = (window as any).__BASE__ || '/';
    initNavUserArea(BASE);
  });
}
