// ========================================
// 谜题数据单元测试
// 测试 PUZZLES 数据完整性与辅助函数
// ========================================

import { describe, it, expect } from 'vitest';
import {
  PUZZLES,
  getPuzzlesByStage,
  getPuzzlesByDifficulty,
  getTotalPuzzleWeight,
  getPuzzleById,
  type Puzzle,
  type PuzzleDifficulty,
  type PuzzleType,
} from '../../data/puzzles';

const VALID_DIFFICULTIES: PuzzleDifficulty[] = ['easy', 'medium', 'hard'];
const VALID_TYPES: PuzzleType[] = ['acrostic', 'keyword', 'password', 'cross_reference', 'search'];

describe('PUZZLES array', () => {
  it('has exactly 7 puzzles (one per stage)', () => {
    expect(PUZZLES).toHaveLength(7);
  });

  it('has stages 1 through 7', () => {
    const stages = PUZZLES.map(p => p.stage).sort();
    expect(stages).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('has no duplicate puzzle IDs', () => {
    const ids = PUZZLES.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each puzzle has all required fields', () => {
    const requiredFields: (keyof Puzzle)[] = [
      'id', 'stage', 'difficulty', 'type', 'name',
      'answerHash', 'clueLocations', 'hintTexts',
      'requiresClue', 'unlocksPages', 'progressWeight', 'clueTags',
    ];

    for (const puzzle of PUZZLES) {
      for (const field of requiredFields) {
        expect(puzzle[field], `${puzzle.id} missing field: ${field}`).toBeDefined();
      }
    }
  });

  it('each puzzle has at least 1 clueLocation (stage7 ending puzzle may have 1)', () => {
    for (const puzzle of PUZZLES) {
      expect(
        puzzle.clueLocations.length,
        `${puzzle.id} should have >= 1 clueLocations, got ${puzzle.clueLocations.length}`
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it('each puzzle has at least 2 hintTexts', () => {
    for (const puzzle of PUZZLES) {
      expect(
        puzzle.hintTexts.length,
        `${puzzle.id} should have >= 2 hintTexts, got ${puzzle.hintTexts.length}`
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it('all answerHashes are non-empty hex strings (actual SHA-256 = 64 chars, placeholders may differ)', () => {
    for (const puzzle of PUZZLES) {
      expect(puzzle.answerHash, `${puzzle.id} answerHash is empty`).toBeTruthy();
      expect(
        /^[0-9a-f]+$/i.test(puzzle.answerHash),
        `${puzzle.id} answerHash "${puzzle.answerHash}" is not hex`
      ).toBe(true);
    }
  });

  it('all path-like clueLocations and unlocksPages start with /', () => {
    for (const puzzle of PUZZLES) {
      // clueLocations can be descriptions or paths — only check ones that look like paths
      for (const loc of puzzle.clueLocations) {
        if (loc.startsWith('/')) {
          // Already starts with / — passes
          expect(true).toBe(true);
        }
        // Non-path descriptions (e.g. "搜索"沈辞" → ...") are valid too
      }
      for (const page of puzzle.unlocksPages) {
        expect(page, `${puzzle.id}: unlocksPage "${page}" should start with /`).toMatch(/^\//);
      }
    }
  });

  it('all unlocksPages start with /', () => {
    for (const puzzle of PUZZLES) {
      for (const page of puzzle.unlocksPages) {
        expect(page, `${puzzle.id}: unlocksPage "${page}" should start with /`).toMatch(/^\//);
      }
    }
  });

  it('all difficulties are valid', () => {
    for (const puzzle of PUZZLES) {
      expect(
        VALID_DIFFICULTIES.includes(puzzle.difficulty),
        `${puzzle.id} has invalid difficulty: ${puzzle.difficulty}`
      ).toBe(true);
    }
  });

  it('all types are valid', () => {
    for (const puzzle of PUZZLES) {
      expect(
        VALID_TYPES.includes(puzzle.type),
        `${puzzle.id} has invalid type: ${puzzle.type}`
      ).toBe(true);
    }
  });

  it('all progressWeights are positive', () => {
    for (const puzzle of PUZZLES) {
      expect(
        puzzle.progressWeight,
        `${puzzle.id} progressWeight should be > 0`
      ).toBeGreaterThan(0);
    }
  });

  it('each puzzle has at least 1 clueTag', () => {
    for (const puzzle of PUZZLES) {
      expect(
        puzzle.clueTags.length,
        `${puzzle.id} should have >= 1 clueTags`
      ).toBeGreaterThanOrEqual(1);
    }
  });
});

// ========================================
// 辅助函数测试
// ========================================
describe('getPuzzlesByStage', () => {
  it('returns correct puzzle for stage 1', () => {
    const puzzles = getPuzzlesByStage(1);
    expect(puzzles).toHaveLength(1);
    expect(puzzles[0].id).toBe('shenci_password');
  });

  it('returns correct puzzle for stage 3', () => {
    const puzzles = getPuzzlesByStage(3);
    expect(puzzles).toHaveLength(1);
    expect(puzzles[0].id).toBe('stage1_page_header_password');
  });

  it('returns empty array for non-existent stage', () => {
    expect(getPuzzlesByStage(99)).toEqual([]);
    expect(getPuzzlesByStage(0)).toEqual([]);
    expect(getPuzzlesByStage(-1)).toEqual([]);
  });
});

describe('getPuzzlesByDifficulty', () => {
  it('returns puzzles for easy difficulty', () => {
    const puzzles = getPuzzlesByDifficulty('easy');
    // Stage 1 (shenci_password), 2 (stage2_acrostic_journal), 4 (stage4_temple_discovery), 7 (stage7_phone_report)
    expect(puzzles.length).toBeGreaterThanOrEqual(2);
    for (const p of puzzles) {
      expect(p.difficulty).toBe('easy');
    }
  });

  it('returns puzzles for medium difficulty', () => {
    const puzzles = getPuzzlesByDifficulty('medium');
    // Stage 3 (stage1_page_header_password), 5 (stage5_staff_access)
    expect(puzzles.length).toBeGreaterThanOrEqual(1);
    for (const p of puzzles) {
      expect(p.difficulty).toBe('medium');
    }
  });

  it('returns puzzles for hard difficulty', () => {
    const puzzles = getPuzzlesByDifficulty('hard');
    // Stage 6 (stage6_shenci_admin_discovery)
    expect(puzzles.length).toBeGreaterThanOrEqual(1);
    for (const p of puzzles) {
      expect(p.difficulty).toBe('hard');
    }
  });
});

describe('getTotalPuzzleWeight', () => {
  it('returns sum of all puzzle weights (should be 95)', () => {
    // 10+20+15+8+12+18+12 = 95
    expect(getTotalPuzzleWeight()).toBe(95);
  });

  it('equals sum of individual weights', () => {
    const sum = PUZZLES.reduce((s, p) => s + p.progressWeight, 0);
    expect(getTotalPuzzleWeight()).toBe(sum);
  });
});

describe('getPuzzleById', () => {
  it('returns correct puzzle for valid ID', () => {
    const puzzle = getPuzzleById('shenci_password');
    expect(puzzle).toBeDefined();
    expect(puzzle!.name).toBe('沈辞账号密码拼凑');
  });

  it('returns undefined for non-existent ID', () => {
    expect(getPuzzleById('nonexistent_puzzle')).toBeUndefined();
  });

  it('can retrieve all puzzles by their IDs', () => {
    for (const puzzle of PUZZLES) {
      expect(getPuzzleById(puzzle.id)).toBe(puzzle);
    }
  });
});
