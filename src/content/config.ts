// ========================================
// Content Collections 配置
// 将 src/data/ 中的游戏数据迁移为类型安全的集合
// 与原有 TS 导出并存，渐进式迁移
// ========================================

import { defineCollection, z } from 'astro:content';

// 谜题集合
const puzzles = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    stage: z.number().min(1).max(7),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    type: z.enum([
      'acrostic',
      'keyword',
      'password',
      'cross_reference',
      'search',
    ]),
    name: z.string(),
    answerHash: z.string().regex(/^[0-9a-f]{64}$/, 'Must be a valid SHA-256 hex'),
    clueLocations: z.array(z.string()),
    hintTexts: z.array(z.string()),
    requiresClue: z.array(z.string()),
    unlocksPages: z.array(z.string()),
    progressWeight: z.number().positive(),
    clueTags: z.array(z.string()),
  }),
});

// 用户集合
const users = defineCollection({
  type: 'data',
  schema: z.object({
    username: z.string(),
    displayName: z.string(),
    avatarBg: z.string(),
    role: z.string(),
    registered: z.string(),
    lastLogin: z.string(),
    bio: z.string(),
    postCount: z.number(),
    followerCount: z.number(),
    followingCount: z.number(),
  }),
});

// 搜索存档集合
const archivedPosts = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    authorUrl: z.string(),
    date: z.string(),
    content: z.string(),
    isClue: z.boolean(),
    pageUrl: z.string().optional(),
  }),
});

export const collections = {
  puzzles,
  users,
  'archived-posts': archivedPosts,
};
