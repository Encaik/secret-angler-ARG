// ========================================
// 控制台隐藏消息
// 在所有公开页面加载，增加 ARG 沉浸感
// ========================================

(function () {
  // 防止重复注入
  if ((window as any).__ARG_CONSOLE_INJECTED) return;
  (window as any).__ARG_CONSOLE_INJECTED = true;

  const styles = {
    title: 'color: #4a90d9; font-size: 16px; font-weight: bold;',
    warn: 'color: #c00; font-size: 11px;',
    info: 'color: #888; font-size: 11px;',
    subtle: 'color: #aaa; font-size: 10px;',
  };

  console.log('%c探秘者联盟 v2.4.1', styles.title);
  console.log('%c内部管理系统已就绪。未经授权的访问将被记录并追踪。', styles.warn);
  console.log(`%c[系统] 在线探秘者: 47 | 今日新增投稿: 3 | 待审核: 12 | 服务器负载: 23%`, styles.info);

  // 在隐藏/后台页面输出不同的消息
  if (window.location.pathname.includes('/hidden/')) {
    console.log('%c[法务寮] 常住僧众法印验证中……', styles.warn);
    console.log('%c[戒律] 此区域为归源宗内参系统。所有阅览将被记入法堂审记。', styles.warn);
  }

  if (window.location.pathname.includes('/member/')) {
    console.log('%c[会员系统] 直播流状态：等待信号源……', styles.info);
    console.log('%c[提醒] 会员内容仅供个人观看，禁止录屏传播。', styles.subtle);
  }

  // 沈辞主页额外消息
  if (window.location.pathname.includes('/user/shenci')) {
    console.log('%c[用户档案] 地下三尺 — 最后登录：2026-05-25 — 状态：离线超过7天', styles.info);
  }

  // 林屿主页额外消息
  if (window.location.pathname.includes('/user/linyu')) {
    console.log('%c[用户档案] signal_屿 — 最后登录：刚刚 — 状态：在线', styles.info);
  }
})();
