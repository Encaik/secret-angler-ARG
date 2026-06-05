// ========================================
// 凭证数据 — 从各 .astro 文件中提取
// 登录验证逻辑统一使用此模块，页面和测试共享同源数据
// ========================================

/** 主站登录凭证（/login/） */
export const MAIN_CREDENTIALS: Record<string, { password: string; redirect: string }> = {
  'lyu': { password: 'starchaser24', redirect: '/user/center/lyu/' },
  'shenci': { password: 'helanshan06', redirect: '/user/center/shenci/' },
};

/** 后台管理系统凭证（/hidden/admin/） */
export const ADMIN_PASSWORD = 'deeprift323';
export const STAFF_PASSWORD = 'portal2026';
export const ADMIN_USERS = ['admin', '首座', '监院'];
export const STAFF_USERS = ['staff'];

/** 暗网交易市场凭证（/hidden/panlongxia/） */
export const DARKNET_ACCOUNTS: Record<string, string> = {
  'DR-2026-03': 'rift0603',
};

/** 暗网邀请凭证号码（/about/ "加入我们" 联系电话栏输入） */
export const DARKNET_INVITE_PHONE = '17093280045';

/** 会员区访问码（搜索"深海裂隙2026"解锁） */
export const MEMBER_ACCESS_CODE = '深海裂隙2026';

/** 沈辞密码组成的各部分（用于拼凑验证） */
export const SHENCI_PASSWORD_PARTS = {
  site: 'helanshan',    // 贺兰山拼音全小写
  birthYear: '06',      // 出生年份后两位
  full: 'helanshan06',  // 完整密码
};

/** 林屿密码 */
export const LYU_PASSWORD = 'starchaser24';
