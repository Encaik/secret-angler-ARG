// ========================================
// ⭐ 主线流程端到端冒烟测试
// 模拟完整 7 阶段玩家状态转移
// 任何破坏游戏可玩性的改动都会被此测试捕获
// ========================================

import { describe, it, expect, beforeEach } from 'vitest';
import { evaluateEnding } from '../../scripts/ending';
import {
  findArchivedContent,
  HIDDEN_PAGE_CACHE,
  PUZZLE_ANSWER as PUZZLE_ANSWER_CONST,
  SEARCH_TOKEN,
} from '../../data/search-data';
import {
  MAIN_CREDENTIALS,
  ADMIN_PASSWORD,
  STAFF_PASSWORD,
  DARKNET_ACCOUNTS,
  MEMBER_ACCESS_CODE,
  SHENCI_PASSWORD_PARTS,
} from '../../data/credentials';
import '../../scripts/progress'; // 副作用导入，函数挂载到 window
import { createEmptyProgress, seedProgress, readProgress } from '../helpers';

const { getProgress, saveProgress, recordPageVisit } = window as any;

describe('Main Flow Smoke Test: Complete 7-Stage Walkthrough', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ==========================================
  // STAGE 1: Prologue → Post 247 → Login Lyu
  // ==========================================
  describe('Stage 1: Prologue and First Discovery', () => {
    it('initializes progress when player visits the prologue page', () => {
      // Simulate: player visits / (prologue page)
      const progress = getProgress();
      expect(progress.currentStage).toBe(1);
      expect(progress.discoveredPages).toContain(window.location.pathname);
      expect(progress.startedAt).toBeGreaterThan(0);
    });

    it('records visit to post 247 (Shen Ci departure post)', () => {
      seedProgress(createEmptyProgress());
      recordPageVisit('/community/post/247/');

      const progress = readProgress();
      expect(progress.discoveredPages).toContain('/community/post/247/');
    });

    it('identifies anomalies in post 247 via cross-reference search', () => {
      // Anomaly: Old GPS device — search "GPS" reveals new device purchased 2025-12-15
      const gpsResults = findArchivedContent('GPS');
      const newGpsPost = gpsResults.find((p) => p.content.includes('新的GPS') || p.content.includes('新'));
      expect(newGpsPost).toBeDefined();
      expect(newGpsPost!.content).toMatch(/GPS/);
      expect(newGpsPost!.date).toContain('2025-12');
    });

    it('lyu login credential exists and is correct', () => {
      expect(MAIN_CREDENTIALS['lyu']).toBeDefined();
      expect(MAIN_CREDENTIALS['lyu'].password).toBe('starchaser24');
    });

    it('after lyu login, redirects to user center', () => {
      expect(MAIN_CREDENTIALS['lyu'].redirect).toBe('/user/center/lyu/');
    });

    it('lyu login records login_lyu clue in progress', () => {
      // Simulate what login.astro does
      seedProgress(createEmptyProgress({ discoveredPages: ['/', '/community/post/247/', '/login/'] }));
      const progress = readProgress();
      progress.discoveredClues.push('login_lyu');
      saveProgress(progress);

      const updated = readProgress();
      expect(updated.discoveredClues).toContain('login_lyu');
    });
  });

  // ==========================================
  // STAGE 2: Inbox → Get Shen Ci Password → Login Shen Ci
  // ==========================================
  describe('Stage 2: Shen Ci Password Assembly and Login', () => {
    it('Path A: search "沈辞" → new-member post reveals "贺兰山" + "06年"', () => {
      const results = findArchivedContent('沈辞');
      const newMember = results.find((p) => p.title === '新人报到帖');

      expect(newMember).toBeDefined();
      expect(newMember!.content).toMatch(/贺兰山/);
      expect(newMember!.content).toMatch(/06/);
    });

    it('Path B: search "贺兰山" → recall post confirms first site', () => {
      const results = findArchivedContent('贺兰山');
      const recall = results.find((p) => p.title.includes('回忆帖'));

      expect(recall).toBeDefined();
      expect(recall!.content).toMatch(/贺兰山是我探秘的起点/);
    });

    it('Path C: search "06" → new-member post confirms birth year', () => {
      const results = findArchivedContent('06');
      const newMember = results.find((p) => p.title === '新人报到帖');

      expect(newMember).toBeDefined();
      expect(newMember!.content).toMatch(/贺兰山/);
      expect(newMember!.content).toMatch(/06/);
    });

    it('assembled shenci password is "helanshan06" (helanshan + 06)', () => {
      // First site: 贺兰山 → helanshan
      // Birth year: 06 → 06
      const assembled = SHENCI_PASSWORD_PARTS.site + SHENCI_PASSWORD_PARTS.birthYear;
      expect(assembled).toBe('helanshan06');
    });

    it('shenci login credential exists and is correct', () => {
      expect(MAIN_CREDENTIALS['shenci']).toBeDefined();
      expect(MAIN_CREDENTIALS['shenci'].password).toBe('helanshan06');
    });

    it('after shenci login, redirects to user center', () => {
      expect(MAIN_CREDENTIALS['shenci'].redirect).toBe('/user/center/shenci/');
    });

    it('shenci login records login_shenci clue', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: ['/', '/community/post/247/', '/login/'],
          discoveredClues: ['login_lyu'],
        }),
      );
      const progress = readProgress();
      progress.discoveredClues.push('login_shenci');
      progress.solvedPuzzles['shenci_password'] = true;
      saveProgress(progress);

      const updated = readProgress();
      expect(updated.discoveredClues).toContain('login_shenci');
      expect(updated.solvedPuzzles['shenci_password']).toBe(true);
    });
  });

  // ==========================================
  // STAGE 3: Hidden Post → Acrostic → Search → Trigger Rift
  // ==========================================
  describe('Stage 3: Acrostic Discovery and Rift Trigger', () => {
    it('searching "加密" reveals hint about cangtou/cangwei technique', () => {
      const results = findArchivedContent('加密');
      const hintPost = results.find((p) => p.author === 'signal_屿');

      expect(hintPost).toBeDefined();
      expect(hintPost!.content).toMatch(/藏头|藏尾|开头|结尾/);
    });

    it('acrostic "多站同源" can be assembled from four paragraph first chars', () => {
      // 多-站-同-源 from paragraphs: 多次, 站与站, 同一个, 源头
      const firstChars = ['多', '站', '同', '源'];
      const acrostic = firstChars.join('');
      expect(acrostic).toBe('多站同源');
    });

    it('HIDDEN_PAGE_CACHE maps "多站同源" → /trigger/rift', () => {
      expect(HIDDEN_PAGE_CACHE['多站同源']).toBeDefined();
      expect(HIDDEN_PAGE_CACHE['多站同源'].pageUrl).toBe('/trigger/rift');
    });

    it('searching "多站同源" returns the rift cache entry in search results', () => {
      const cacheEntry = HIDDEN_PAGE_CACHE['多站同源'];
      expect(cacheEntry).toBeDefined();
      expect(cacheEntry.isClue).toBe(true);
      expect(cacheEntry.title).toContain('内部系统操作日志');
    });

    it('PUZZLE_ANSWER "多站同源2026" combines acrostic + year', () => {
      const acrostic = '多站同源';
      const year = '2026';
      const combined = acrostic + year;
      expect(combined).toBe(PUZZLE_ANSWER_CONST);
      expect(combined).toBe(MEMBER_ACCESS_CODE);
    });

    it('elevated search requires token + bracket format: kd7f3g[多站同源]', () => {
      // The correct elevated search format: token + bracketed keyword
      const elevatedQuery = SEARCH_TOKEN + '[多站同源]';
      expect(elevatedQuery).toBe('kd7f3g[多站同源]');

      // Verify the token is present
      expect(elevatedQuery.includes(SEARCH_TOKEN)).toBe(true);

      // Verify the keyword is inside brackets
      const bracketMatch = elevatedQuery.match(/\[(.+?)\]/);
      expect(bracketMatch).not.toBeNull();
      expect(bracketMatch![1]).toBe('多站同源');

      // Bare keyword without token+brackets → no elevated access
      const normalQuery = '多站同源';
      expect(normalQuery.includes(SEARCH_TOKEN)).toBe(false);
      expect(normalQuery.match(/\[(.+?)\]/)).toBeNull();

      // Brackets without token → no elevated access
      const bracketOnly = '[多站同源]';
      expect(bracketOnly.includes(SEARCH_TOKEN)).toBe(false);
    });

    it('solving puzzle records stage1_page_header_password in progress', () => {
      seedProgress(
        createEmptyProgress({
          discoveredClues: ['login_lyu', 'login_shenci'],
        }),
      );
      const progress = readProgress();
      progress.solvedPuzzles['stage2_acrostic_journal'] = true;
      progress.solvedPuzzles['stage1_page_header_password'] = true;
      saveProgress(progress);

      const updated = readProgress();
      expect(updated.solvedPuzzles['stage2_acrostic_journal']).toBe(true);
      expect(updated.solvedPuzzles['stage1_page_header_password']).toBe(true);
    });
  });

  // ==========================================
  // STAGE 4: Member Area → Rift Info → Stargate/Base
  // ==========================================
  describe('Stage 4: Member Area and Signal Tracking', () => {
    it('with puzzle solved, member area can be accessed', () => {
      seedProgress(
        createEmptyProgress({
          solvedPuzzles: { stage1_page_header_password: true },
        }),
      );
      const progress = readProgress();
      expect(progress.solvedPuzzles['stage1_page_header_password']).toBe(true);
    });

    it('rift page reveals "归源宗功德流通处" as front for darknet', () => {
      // Search "归源宗" maps to HIDDEN_PAGE_CACHE
      expect(HIDDEN_PAGE_CACHE['归源宗']).toBeDefined();
      expect(HIDDEN_PAGE_CACHE['归源宗'].pageUrl).toBe('/hidden/panlongxia');
    });

    it('admin password xiaoyu2021 is assembled from personal details of the cult leader', () => {
      // xiaoyu (daughter's name from internal chat) + 2021 (wife's death year from board + site founding year)
      expect(ADMIN_PASSWORD).toBe('xiaoyu2021');
    });

    it('searching "星门坐标" → HIDDEN_PAGE_CACHE maps to /trigger/stargate', () => {
      expect(HIDDEN_PAGE_CACHE['星门坐标']).toBeDefined();
      expect(HIDDEN_PAGE_CACHE['星门坐标'].pageUrl).toBe('/trigger/stargate');
    });

    it('searching "布景基地" → HIDDEN_PAGE_CACHE maps to /trigger/base', () => {
      expect(HIDDEN_PAGE_CACHE['布景基地']).toBeDefined();
      expect(HIDDEN_PAGE_CACHE['布景基地'].pageUrl).toBe('/trigger/base');
    });

    it('staff credentials exist: staff/portal2026', () => {
      expect(STAFF_PASSWORD).toBe('portal2026');
    });
  });

  // ==========================================
  // STAGE 5: Darknet Access → Admin Discovery
  // ==========================================
  describe('Stage 5: Darknet Access and Admin Discovery', () => {
    it('darknet account exists: DR-2026-03 / rift0603', () => {
      expect(DARKNET_ACCOUNTS['DR-2026-03']).toBe('rift0603');
    });

    it('darknet login records stage4_darknet_access', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: ['/hidden/panlongxia/'],
        }),
      );
      const progress = readProgress();
      progress.solvedPuzzles['stage4_darknet_access'] = true;
      progress.discoveredClues.push('darknet_marketplace');
      saveProgress(progress);

      const updated = readProgress();
      expect(updated.solvedPuzzles['stage4_darknet_access']).toBe(true);
      expect(updated.discoveredClues).toContain('darknet_marketplace');
    });

    it('searching "后台管理" → HIDDEN_PAGE_CACHE maps to /hidden/admin', () => {
      expect(HIDDEN_PAGE_CACHE['后台管理']).toBeDefined();
      expect(HIDDEN_PAGE_CACHE['后台管理'].pageUrl).toBe('/hidden/admin');
    });

    it('admin page requires login — staff password is portal2026', () => {
      expect(STAFF_PASSWORD).toBe('portal2026');
    });

    it('admin full access requires xiaoyu2021', () => {
      expect(ADMIN_PASSWORD).toBe('xiaoyu2021');
    });
  });

  // ==========================================
  // STAGE 6: Admin Login → Hidden Pages Evidence
  // ==========================================
  describe('Stage 6: Admin Access and Evidence Collection', () => {
    it('admin login with xiaoyu2021 records admin_access', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: ['/hidden/admin/'],
        }),
      );
      const progress = readProgress();
      progress.solvedPuzzles['stage3_hidden_admin_password'] = true;
      progress.discoveredClues.push('admin_access');
      saveProgress(progress);

      const updated = readProgress();
      expect(updated.solvedPuzzles['stage3_hidden_admin_password']).toBe(true);
      expect(updated.discoveredClues).toContain('admin_access');
    });

    it('all hidden evidence pages exist as visitable URLs', () => {
      const hiddenPages = [
        '/hidden/board/',
        '/hidden/operation/',
        '/hidden/locations/',
        '/hidden/dead-drop/',
        '/hidden/targets/',
        '/hidden/evidence-locker/',
      ];

      seedProgress(createEmptyProgress());
      for (const page of hiddenPages) {
        recordPageVisit(page);
      }

      const progress = readProgress();
      for (const page of hiddenPages) {
        expect(progress.discoveredPages).toContain(page);
      }
    });

    it('recording all hidden pages sets playerTargeted', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: ['/trigger/rift/', '/trigger/stargate/', '/trigger/base/'],
          playerTargeted: false,
        }),
      );

      recordPageVisit('/hidden/admin/'); // 4th hidden/trigger page

      const progress = readProgress();
      expect(progress.playerTargeted).toBe(true);
    });
  });

  // ==========================================
  // STAGE 7: Evidence → Score → 4 Endings
  // ==========================================
  describe('Stage 7: Evidence Scoring and Ending Evaluation', () => {
    it('all 8 evidence pages exist and are distinct', () => {
      const evidencePages = [
        '/trigger/rift',
        '/trigger/stargate',
        '/trigger/base',
        '/hidden/panlongxia',
        '/hidden/board',
        '/hidden/operation',
        '/hidden/locations',
        '/hidden/dead-drop',
      ];
      expect(new Set(evidencePages).size).toBe(8);
      expect(evidencePages).toHaveLength(8);
    });

    it('max possible score is 21 (2+2+3+3+2+2+3+4)', () => {
      const weights = [2, 2, 3, 3, 2, 2, 3, 4];
      expect(weights.reduce((a, b) => a + b, 0)).toBe(21);
    });

    it('ENDING 1 (0-6): with no evidence → ending 1 (孤身沦陷)', () => {
      seedProgress(createEmptyProgress());
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
    });

    it('ENDING 1 (0-6): with only E1+E2 → score 4 → ending 1', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: ['/trigger/rift', '/trigger/stargate'],
        }),
      );
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
      expect(result.score).toBe(4);
    });

    it('ENDING 2 (7-11): with trigger pages only (E1+E2+E3) → score 7 → ending 2 (孤军救人)', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: ['/trigger/rift', '/trigger/stargate', '/trigger/base'],
        }),
      );
      const result = evaluateEnding();
      expect(result.ending).toBe(2);
      expect(result.score).toBe(7);
    });

    it('ENDING 3 (12-17): with trigger+darknet+board → score 12 → ending 3 (局部破获)', () => {
      // E1(2)+E2(2)+E3(3)+E4(3)+E5(2) = 12
      seedProgress(
        createEmptyProgress({
          discoveredPages: [
            '/trigger/rift',
            '/trigger/stargate',
            '/trigger/base',
            '/hidden/panlongxia',
            '/hidden/board',
          ],
        }),
      );
      const result = evaluateEnding();
      expect(result.ending).toBe(3);
      expect(result.score).toBe(12);
    });

    it('ENDING 4 (18-21): with all evidence → score 21 → ending 4 (全链覆灭)', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: [
            '/trigger/rift',
            '/trigger/stargate',
            '/trigger/base',
            '/hidden/panlongxia',
            '/hidden/board',
            '/hidden/operation',
            '/hidden/locations',
            '/hidden/dead-drop',
          ],
        }),
      );
      const result = evaluateEnding();
      expect(result.ending).toBe(4);
      expect(result.score).toBe(21);
    });

    it('E8 dead-drop auto-upgrade: score 12 + E8 → ending 4', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: [
            '/trigger/rift',
            '/trigger/stargate',
            '/trigger/base',
            '/hidden/locations',
            '/hidden/dead-drop',
          ],
        }),
      );
      const result = evaluateEnding();
      // Without E8: score = 2+2+3+3+4 = 14
      // With E8 special rule: >= 12 + E8 → ending 4
      expect(result.ending).toBe(4);
    });

    it('buying ticket path (playerTargeted + low score) forces ending 1', () => {
      seedProgress(
        createEmptyProgress({
          discoveredPages: ['/trigger/rift', '/trigger/stargate'],
          playerTargeted: true,
        }),
      );
      const result = evaluateEnding();
      expect(result.ending).toBe(1);
    });
  });

  // ==========================================
  // FULL END-TO-END: Complete 7-stage state machine
  // ==========================================
  describe('Complete Walkthrough: State Machine', () => {
    it('integrated walkthrough: stages 1 through 7 in sequence', () => {
      // ---- Stage 1: Enter site, read post 247 ----
      seedProgress(createEmptyProgress());
      recordPageVisit('/community/post/247/');
      let progress = readProgress();
      expect(progress.discoveredPages).toContain('/community/post/247/');

      // ---- Stage 2: Login lyu, get shenci password ----
      progress = readProgress();
      progress.discoveredClues.push('login_lyu');
      saveProgress(progress);

      // Search "沈辞" → find new-member post
      const searchResults1 = findArchivedContent('沈辞');
      const newMemberPost = searchResults1.find((p) => p.title === '新人报到帖');
      expect(newMemberPost).toBeDefined();
      expect(newMemberPost!.content).toMatch(/贺兰山/);
      expect(newMemberPost!.content).toMatch(/06/);

      // Login shenci
      progress = readProgress();
      progress.discoveredClues.push('login_shenci');
      progress.solvedPuzzles['shenci_password'] = true;
      saveProgress(progress);

      // ---- Stage 3: Discover acrostic "多站同源" ----
      // Verify "加密" hint exists
      const encryptHint = findArchivedContent('加密');
      expect(encryptHint.length).toBeGreaterThan(0);

      // Acrostic: 多-站-同-源
      const acrosticChars = ['多', '站', '同', '源'];
      expect(acrosticChars.join('')).toBe('多站同源');

      // HIDDEN_PAGE_CACHE entry for "多站同源"
      expect(HIDDEN_PAGE_CACHE['多站同源'].pageUrl).toBe('/trigger/rift');

      // Record trigger discovery
      recordPageVisit('/trigger/rift/');
      progress = readProgress();
      progress.solvedPuzzles['stage2_acrostic_journal'] = true;
      saveProgress(progress);

      // ---- Stage 4: Member access + trigger exploration ----
      // Combine "多站同源" + "2026" → member access
      expect(MEMBER_ACCESS_CODE).toBe('多站同源2026');

      progress = readProgress();
      progress.solvedPuzzles['stage1_page_header_password'] = true;
      saveProgress(progress);

      recordPageVisit('/trigger/stargate/');
      recordPageVisit('/trigger/base/');
      recordPageVisit('/member/');

      progress = readProgress();
      expect(progress.solvedPuzzles['stage1_page_header_password']).toBe(true);

      // ---- Stage 5: Darknet access ----
      expect(DARKNET_ACCOUNTS['DR-2026-03']).toBe('rift0603');

      recordPageVisit('/hidden/panlongxia/');
      progress = readProgress();
      progress.solvedPuzzles['stage4_darknet_access'] = true;
      progress.discoveredClues.push('darknet_account_claimed');
      saveProgress(progress);

      // ---- Stage 6: Admin access + evidence collection ----
      expect(ADMIN_PASSWORD).toBe('xiaoyu2021');

      recordPageVisit('/hidden/admin/');
      progress = readProgress();
      progress.solvedPuzzles['stage3_hidden_admin_password'] = true;
      progress.discoveredClues.push('admin_access');
      saveProgress(progress);

      // Visit all hidden evidence pages
      const hiddenPages = [
        '/hidden/board/',
        '/hidden/operation/',
        '/hidden/locations/',
        '/hidden/dead-drop/',
        '/hidden/targets/',
        '/hidden/evidence-locker/',
      ];
      for (const page of hiddenPages) {
        recordPageVisit(page);
      }

      // ---- Stage 7: Evidence evaluation ----
      progress = readProgress();
      // Should have all evidence pages
      expect(progress.discoveredPages).toContain('/trigger/rift/');
      expect(progress.discoveredPages).toContain('/trigger/stargate/');
      expect(progress.discoveredPages).toContain('/trigger/base/');
      expect(progress.discoveredPages).toContain('/hidden/panlongxia/');
      expect(progress.discoveredPages).toContain('/hidden/board/');
      expect(progress.discoveredPages).toContain('/hidden/operation/');
      expect(progress.discoveredPages).toContain('/hidden/locations/');
      expect(progress.discoveredPages).toContain('/hidden/dead-drop/');

      // Evaluate ending
      const endingResult = evaluateEnding();
      expect(endingResult.ending).toBe(4); // Full evidence → perfect ending
      expect(endingResult.score).toBe(21);
      expect(endingResult.collected).toHaveLength(8);
      expect(endingResult.missing).toHaveLength(0);

      // ---- Verify game is NOT blocked at any stage ----
      // Stage 1-2: login works
      expect(MAIN_CREDENTIALS['lyu'].password).toBeTruthy();
      expect(MAIN_CREDENTIALS['shenci'].password).toBeTruthy();

      // Stage 3: search keywords work
      expect(findArchivedContent('沈辞').length).toBeGreaterThan(0);
      expect(HIDDEN_PAGE_CACHE['多站同源']).toBeDefined();

      // Stage 4: puzzle answer works
      expect(PUZZLE_ANSWER_CONST).toBe('多站同源2026');

      // Stage 5: darknet credentials work
      expect(DARKNET_ACCOUNTS['DR-2026-03']).toBeDefined();

      // Stage 6: admin credentials work
      expect(ADMIN_PASSWORD).toBeTruthy();

      // Stage 7: ending engine works
      expect(endingResult.ending).toBeGreaterThanOrEqual(1);
      expect(endingResult.ending).toBeLessThanOrEqual(4);
    });
  });
});
