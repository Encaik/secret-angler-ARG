## Context

项目是纯 Astro 静态站点（MPA），77 个 `.astro` 页面，23 个 TypeScript 脚本，559 行的单一 `global.css`，已有 232 个通过测试。TypeScript strict mode 已启用，路径引用已全部规范化为 `__BASE_PATH__`。当前缺少代码风格自动化（无 ESLint/Prettier），样式组织单一（1 个 CSS 文件 + 11 个内联 `<style>` 块），无 CI 门禁，构建有 8 个 Astro 提示噪音。优化应在不改变游戏内容/流程的前提下进行。

## Goals / Non-Goals

**Goals:**

- 统一代码风格，自动化格式检查，消除人工审查风格问题的心智负担
- 将 CSS 按职责模块化拆分，消除内联 `<style>` 块，提高样式可维护性
- 建立 CI 门禁（lint + type-check + test + build），阻止回归
- 审查并记录沉浸感术语违规现状，修复可安全修改的措辞
- 审计游戏设计文档与实际实现的一致性

**Non-Goals:**

- 不修改核心数据模型（`puzzles.ts`、`search-data.ts`、`users.ts`）
- 不更改游戏谜题逻辑、结局判定、进度管理
- 不引入新的运行时依赖（保持纯静态站点原则）
- 不重构 Astro 页面路由结构
- 不添加 SSR/API 路由

## Decisions

### 1. ESLint 配置：`@antfu/eslint-config` vs 手动配置

**选择：手动配置最小规则集**

理由：项目语法规范已通过 TypeScript strict + `astro check` 覆盖了类型安全。ESLint 仅需补足格式一致性（缩进、引号、分号、import 排序），不需要全量规则集。引入 `@antfu/eslint-config` 会拉入 ~50 个依赖，与项目"零依赖"哲学冲突。最小化的 `eslint.config.mjs`（ESLint flat config）足以实现目标。

配置要点：

- `eslint-plugin-astro` — Astro 文件解析
- `@typescript-eslint/parser` — TS 解析
- Prettier 通过 `eslint-config-prettier` 与 ESLint 共存
- 规则范围：禁止 `console.log`（除 `src/scripts/console.ts`）、强制 import 排序、禁止未使用变量

### 2. CSS 拆分策略：按页面 vs 按职责

**选择：按职责拆分为 4 个文件，页面特有样式保留 Astro scoped `<style>`（不内联到全局）**

理由：项目是 MPA 多页应用，每个页面是独立 HTML。按页面拆分会导致 ~75 个 CSS 文件，大量重复。按职责拆分：

- `global.css` — CSS 变量、reset、字体、基础排版（~150 行）
- `layout.css` — 导航栏、页脚、框架栅格、容器类（~200 行）
- `components.css` — 可复用组件样式（搜索框、卡片、分页、用户头像等）（~150 行）
- `utilities.css` — 工具类（间距、文本对齐、可见性切换）（~60 行）

当前 11 处内联 `<style>` 块中，属于组件级别的迁移到 `components.css`，属于页面特有装饰的保留为 Astro scoped `<style>`（已由 Astro 自动 scoping 处理，无需消除）。

### 3. CI 平台：GitHub Actions vs 保持纯本地

**选择：GitHub Actions + Husky 预提交轻量钩子**

理由：项目已托管 GitHub（`shatong/secret-angler-ARG`）。单工作流文件（`ci.yml`）即可覆盖 lint + type-check + test + build。Husky `pre-commit` 仅运行 lint-staged（格式检查 + astro check），<5s 完成，不阻碍提交节奏。完整测试和构建留给 CI。

### 4. 沉浸感术语处理：严格删除 vs 逐案评估

**选择：逐案评估，分级处理**

11 处违规分布在：

- `hidden/dead-drop/` — "触发"（9 处）、"结局"（1 处）。上下文是"死线触发"、"触发条件"——在犯罪/暗网语境中合理，"结局"指"交易结局"也可接受
- `ending/` — "触发"、"结局"（2 处）。结局页面本身就是玩家的终点，"触发结局"在游戏内部文档语境中勉强可接受
- `urban-legend/` — "线索"（1 处，如为都市传说帖文中的正常讨论语境则保留）

决策：不强行修改术语（强行替换会降低沉浸感），但对确实可替换的措辞做调整。测试保持不变，将已知可接受的术语加入豁免列表。重点是将测试中的术语检测从"硬错误"改为"警告 + 人工审查清单"。

### 5. Astro 提示处理策略

当前 8 个 hint 主要涉及 `<script define:vars>` 和 `is:inline` 指令。这些 hint 是 Astro 推荐的最佳实践建议，不影响构建。逐项评估：可安全添加 `is:inline` 指令的立即修复，`define:vars` 需要审视变量来源后处理。

## Risks / Trade-offs

- **CSS 拆分后加载顺序**：全局样式依赖 CSS 变量定义，必须确保 `global.css` 最先加载（Astro 默认按 import 顺序，已在 `Layout.astro` 中控制）→ Mitigation：构建后检查 `global.css` 在所有页面 `<head>` 中位于首位
- **ESLint 大规模 autoreformat 导致 diff 膨胀**：首次运行 `eslint --fix` 会修改大量文件 → Mitigation：分步进行——先配置规则，再逐批 fix，最后合并提交
- **Husky 在 Windows 环境兼容性**：项目开发环境为 Windows Git Bash，Husky 在 Windows 下有时出现钩子不触发的问题 → Mitigation：CI 作为兜底门禁，Husky 失败不影响提交（用 `--no-verify` 可跳过）
- **沉浸感术语替换过度**：改掉"触发"、"结局"等词可能让文本变得生硬 → Mitigation：仅在存在自然同义替换时修改（如"触发"→"启动"），否则保留并加入豁免列表

## Open Questions

1. CSS 拆分后是否需要 CSS 压缩/去重（如 PurgeCSS）？——暂不引入，当前 CSS 量级（559 行）远未达到需要 tree-shaking 的阈值
2. 是否需要 `commitlint` 规范提交信息格式？——暂不引入，CLAUDE.md 已约定中文提交信息，无需额外工具
3. `engines` 字段应指定 Node.js 版本范围？——当前 `astro 4.x` 要求 Node 18+，但建议等待 CI 配置后再添加确切版本约束
