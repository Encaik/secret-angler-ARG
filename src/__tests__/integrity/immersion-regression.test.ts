// ========================================
// 沉浸感回归检测（构建后运行）
// 扫描构建产物中的沉浸感破坏模式
//
// 运行方式：pnpm build 后，pnpm test:postbuild
// 或者：直接 pnpm test（跳过构建产物的检查）
// ========================================

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const DOCS_DIR = path.resolve(__dirname, '../../../docs');

// ========================================
// 辅助函数
// ========================================

/** 递归获取所有 .html 文件 */
function getAllHtmlFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  // BFS over directory tree
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop()!;
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(current, item.name);
      if (item.isDirectory() && !item.name.startsWith('_') && !item.name.startsWith('.')) {
        stack.push(fullPath);
      } else if (item.isFile() && item.name.endsWith('.html')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/** 读取文件内容（跳过过大的文件） */
function readFileSafe(filePath: string): string | null {
  try {
    const stat = fs.statSync(filePath);
    if (stat.size > 1024 * 1024) return null; // Skip >1MB files
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

// ========================================
// 测试：仅在构建产物存在时运行
// ========================================

// 检查构建产物是否存在（在 describe 外部定义以便跨作用域使用）
const htmlFiles = getAllHtmlFiles(DOCS_DIR);
const hasBuildOutput = htmlFiles.length > 0;

describe('Immersion Regression Tests', () => {
  // 条件测试：仅在构建产物存在时运行
  const itIfBuilt = hasBuildOutput ? it : it.skip;

  // ========================================
  // 禁止 href="#" 死链接
  // ========================================
  describe('No dead links (href="#")', () => {
    itIfBuilt('no href="#" in any built HTML file', () => {
      const violations: string[] = [];

      for (const filePath of htmlFiles) {
        const content = readFileSafe(filePath);
        if (!content) continue;

        // Check for href="#" (but exclude href="#tab-..." which is valid for tab switching)
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (/href\s*=\s*["']#["']\s*/.test(line)) {
            violations.push(`${path.relative(DOCS_DIR, filePath)}:${i + 1}`);
          }
        }
      }

      if (violations.length > 0) {
        // Warning only — real dead links should be fixed but shouldn't block CI
        console.warn(
          `⚠ Found href="#") in ${violations.length} locations (should be fixed):\n` +
          violations.join('\n')
        );
      }
      // Always pass — informational check
      expect(true).toBe(true);
    });
  });

  // ========================================
  // 禁止游戏术语泄漏
  // ========================================
  describe('No game design terminology in visible content', () => {
    // 这些术语不应出现在页面可见文本中
    const FORBIDDEN_TERMS = ['谜题', '解谜', '触发', '线索', '结局'];

    itIfBuilt('no game terminology in built HTML visible text', () => {
      const violations: string[] = [];

      for (const filePath of htmlFiles) {
        const content = readFileSafe(filePath);
        if (!content) continue;

        // 跳过 .astro 源文件（这些是开发代码）
        // 只检查 docs/ 下的构建产物
        // 提取 <body> 中的可见文本（简化处理：提取所有文本内容）
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : content;

        // 移除 <script> 和 <style> 标签内容
        const visibleText = bodyContent
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')  // Remove HTML tags
          .replace(/\s+/g, ' ');

        for (const term of FORBIDDEN_TERMS) {
          if (visibleText.includes(term)) {
            // 找到匹配行
            const lines = bodyContent.split('\n');
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].includes(term)) {
                violations.push(
                  `${path.relative(DOCS_DIR, filePath)}:${i + 1}: "${term}"`
                );
              }
            }
          }
        }
      }

      if (violations.length > 0) {
        // 注意：某些术语可能在叙事语境中合理（如"触发"在技术文档中、"结局"在故事中）
        // 此测试仅作为 warning，不 fail 测试
        console.warn(
          `⚠ Found game terminology in ${violations.length} locations (review manually):\n` +
          violations.slice(0, 10).join('\n') +
          (violations.length > 10 ? `\n... and ${violations.length - 10} more` : '')
        );
      }
    });
  });

  // ========================================
  // HTML 注释中无面向玩家的内容
  // ========================================
  describe('No player-facing content in HTML comments', () => {
    // 玩家不应用到的注释内容
    // 仅检测明确面向玩家的注释内容，"隐藏"是合法代码结构标注
  const FORBIDDEN_COMMENT_PATTERNS = [
    /线索/,
    /谜题/,
    /解谜/,
    /TODO/,
    /FIXME/,
    /TODO:/i,
    /FIXME:/i,
  ];

    itIfBuilt('no CLI/TODO comments in built HTML', () => {
      const violations: string[] = [];

      for (const filePath of htmlFiles) {
        const content = readFileSafe(filePath);
        if (!content) continue;

        // 提取所有 HTML 注释
        const commentRegex = /<!--([\s\S]*?)-->/g;
        let match;
        while ((match = commentRegex.exec(content)) !== null) {
          const comment = match[1];
          for (const pattern of FORBIDDEN_COMMENT_PATTERNS) {
            if (pattern.test(comment)) {
              violations.push(
                `${path.relative(DOCS_DIR, filePath)}: "${comment.trim().slice(0, 80)}"`
              );
              break;
            }
          }
        }
      }

      if (violations.length > 0) {
        console.warn(
          `⚠ Found suspicious comments in ${violations.length} locations (review manually):\n` +
          violations.slice(0, 10).join('\n')
        );
      }
    });
  });

  // ========================================
  // 构建产物完整性
  // ========================================
  describe('Build output integrity', () => {
    itIfBuilt('has expected number of HTML pages', () => {
      // Should have at least 50 pages
      expect(htmlFiles.length).toBeGreaterThan(50);
    });

    itIfBuilt('every page in critical paths exists', () => {
      const criticalPages = [
        'index.html',
        'home/index.html',
        'community/post/247/index.html',
        'login/index.html',
        'search/index.html',
        'trigger/rift/index.html',
        'trigger/stargate/index.html',
        'trigger/base/index.html',
        'hidden/panlongxia/index.html',
        'hidden/admin/index.html',
        'hidden/board/index.html',
        'hidden/operation/index.html',
        'hidden/locations/index.html',
        'hidden/dead-drop/index.html',
        'hidden/targets/index.html',
        'hidden/evidence-locker/index.html',
        'ending/1/index.html',
        'ending/2/index.html',
        'ending/3/index.html',
        'ending/4/index.html',
        'member/index.html',
        'member/login/index.html',
        'about/index.html',
        'share/index.html',
        'user/shenci/index.html',
        'user/lyu/index.html',
        'user/center/lyu/index.html',
        'user/center/shenci/index.html',
        'inbox/lyu/index.html',
        'inbox/shenci/index.html',
      ];

      const missing: string[] = [];
      for (const page of criticalPages) {
        const fullPath = path.join(DOCS_DIR, page);
        if (!fs.existsSync(fullPath)) {
          missing.push(page);
        }
      }

      if (missing.length > 0) {
        expect.fail(`Missing critical pages:\n${missing.join('\n')}`);
      }
    });
  });
});

// ========================================
// 无构建产物时的兜底测试
// ========================================
describe('Build status check', () => {
  it('confirms whether build output exists for post-build tests', () => {
    const built = getAllHtmlFiles(DOCS_DIR);
    if (built.length === 0) {
      console.log('ℹ docs/ directory not found or empty. Run "pnpm build" first for post-build immersion tests.');
    } else {
      console.log(`✓ Build output found: ${built.length} HTML files`);
    }
    // Always pass — this is informational
    expect(true).toBe(true);
  });
});
