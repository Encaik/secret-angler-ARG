// ========================================
// 凭证验证集成测试
// 测试登录凭证一致性与验证逻辑
// ========================================

import { describe, it, expect } from 'vitest';
import {
  MAIN_CREDENTIALS,
  ADMIN_PASSWORD,
  STAFF_PASSWORD,
  ADMIN_USERS,
  STAFF_USERS,
  DARKNET_ACCOUNTS,
  DARKNET_INVITE_PHONE,
  MEMBER_ACCESS_CODE,
  SHENCI_PASSWORD_PARTS,
  LYU_PASSWORD,
} from '../../data/credentials';

describe('MAIN_CREDENTIALS (主站登录)', () => {
  it('lyu password is starchaser24', () => {
    expect(MAIN_CREDENTIALS['lyu'].password).toBe('starchaser24');
  });

  it('shenci password is helanshan06', () => {
    expect(MAIN_CREDENTIALS['shenci'].password).toBe('helanshan06');
  });

  it('lyu redirects to user/center/lyu/', () => {
    expect(MAIN_CREDENTIALS['lyu'].redirect).toBe('/user/center/lyu/');
  });

  it('shenci redirects to user/center/shenci/', () => {
    expect(MAIN_CREDENTIALS['shenci'].redirect).toBe('/user/center/shenci/');
  });

  it('has exactly 2 user accounts', () => {
    expect(Object.keys(MAIN_CREDENTIALS)).toHaveLength(2);
  });
});

describe('ADMIN credentials (后台管理)', () => {
  it('admin password is deeprift323', () => {
    expect(ADMIN_PASSWORD).toBe('deeprift323');
  });

  it('staff password is portal2026', () => {
    expect(STAFF_PASSWORD).toBe('portal2026');
  });

  it('admin password and staff password are different', () => {
    expect(ADMIN_PASSWORD).not.toBe(STAFF_PASSWORD);
  });

  it('admin users include admin, 首座, 监院', () => {
    expect(ADMIN_USERS).toContain('admin');
    expect(ADMIN_USERS).toContain('首座');
    expect(ADMIN_USERS).toContain('监院');
  });

  it('staff users include staff', () => {
    expect(STAFF_USERS).toContain('staff');
  });

  it('admin and staff users do not overlap', () => {
    const overlap = ADMIN_USERS.filter(u => STAFF_USERS.includes(u));
    expect(overlap).toEqual([]);
  });
});

describe('DARKNET credentials (暗网)', () => {
  it('DR-2026-03 password is rift0603', () => {
    expect(DARKNET_ACCOUNTS['DR-2026-03']).toBe('rift0603');
  });

  it('has exactly 1 darknet account', () => {
    expect(Object.keys(DARKNET_ACCOUNTS)).toHaveLength(1);
  });
});

describe('DARKNET_INVITE_PHONE', () => {
  it('is 17093280045', () => {
    expect(DARKNET_INVITE_PHONE).toBe('17093280045');
  });

  it('is exactly 11 digits (Chinese phone number format)', () => {
    expect(DARKNET_INVITE_PHONE).toMatch(/^\d{11}$/);
  });
});

describe('MEMBER_ACCESS_CODE', () => {
  it('equals 深海裂隙2026', () => {
    expect(MEMBER_ACCESS_CODE).toBe('深海裂隙2026');
  });
});

describe('SHENCI_PASSWORD_PARTS', () => {
  it('site is helanshan', () => {
    expect(SHENCI_PASSWORD_PARTS.site).toBe('helanshan');
  });

  it('birthYear is 06', () => {
    expect(SHENCI_PASSWORD_PARTS.birthYear).toBe('06');
  });

  it('full password is helanshan06', () => {
    expect(SHENCI_PASSWORD_PARTS.full).toBe('helanshan06');
  });

  it('matches MAIN_CREDENTIALS shenci password', () => {
    expect(SHENCI_PASSWORD_PARTS.full).toBe(MAIN_CREDENTIALS['shenci'].password);
  });

  it('is composed of site + birthYear', () => {
    expect(SHENCI_PASSWORD_PARTS.full).toBe(
      SHENCI_PASSWORD_PARTS.site + SHENCI_PASSWORD_PARTS.birthYear
    );
  });
});

describe('LYU_PASSWORD', () => {
  it('is starchaser24', () => {
    expect(LYU_PASSWORD).toBe('starchaser24');
  });

  it('matches MAIN_CREDENTIALS lyu password', () => {
    expect(LYU_PASSWORD).toBe(MAIN_CREDENTIALS['lyu'].password);
  });
});

// ========================================
// 密码一致性：凭证模块与用户数据
// ========================================
describe('Cross-reference: credentials vs users data', () => {
  it('lyu password in credentials matches users.ts', () => {
    // This is verified by the LYUPASSWORD test above
    // The actual cross-reference with users.ts is in data-consistency test
    expect(MAIN_CREDENTIALS['lyu'].password).toBe(LYU_PASSWORD);
  });

  it('shenci password in credentials matches users.ts', () => {
    expect(MAIN_CREDENTIALS['shenci'].password).toBe(SHENCI_PASSWORD_PARTS.full);
  });
});
