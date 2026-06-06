## 1. 代码质量工具链

- [x] 1.1 安装 devDependencies：`eslint`、`prettier`、`eslint-plugin-astro`、`@typescript-eslint/parser`、`eslint-config-prettier`
- [x] 1.2 创建 `eslint.config.mjs`（ESLint flat config），配置 Astro + TypeScript 规则集
- [x] 1.3 创建 `.prettierrc`，定义格式化规则（单引号、无分号、2空格缩进、120 字符行宽等）
- [x] 1.4 创建 `.prettierignore`，排除 `dist/`、`docs/`、`node_modules/`、`.astro/`
- [x] 1.5 添加 `lint`、`lint:fix`、`format` 脚本到 `package.json`
- [x] 1.6 运行 `pnpm lint:fix` 批量格式化现有代码
- [x] 1.7 验证 `pnpm lint` 零违规通过

## 2. CSS 模块化拆分

- [x] 2.1 审计当前 `global.css` 内容，按职责标注归属（reset → 保留 / 布局 → layout.css / 组件 → components.css / 工具 → utilities.css）
- [x] 2.2 创建 `src/styles/layout.css`，迁移导航栏、页脚、栅格、容器类
- [x] 2.3 创建 `src/styles/components.css`，迁移搜索框、卡片、分页、用户头像、按钮等可复用组件样式
- [x] 2.4 创建 `src/styles/utilities.css`，迁移间距、对齐、可见性切换等工具类
- [x] 2.5 精简 `src/styles/global.css`，仅保留 CSS 变量、reset、字体、基础排版
- [x] 2.6 更新 `Layout.astro` 和 `HiddenLayout.astro` 的 CSS import 列表，确保加载顺序正确
- [x] 2.7 审查 11 处内联 `<style>` 块：可复用规则迁移到 `components.css`，页面特有装饰保留 scoped 标记
- [x] 2.8 运行 `pnpm build`，抽查 10+ 页面确认无样式回归

## 3. Astro 编译提示清理

- [x] 3.1 运行 `pnpm astro check` 列出当前 8 个 hint 详情
- [x] 3.2 为缺少 `is:inline` 指令的脚本标签添加显式声明
- [x] 3.3 审视 `define:vars` 用法，确认变量注入方式符合 Astro 最佳实践
- [x] 3.4 验证 `pnpm astro check` 的 hint 数量降至预期水平

## 4. 沉浸感内容审计

- [x] 4.1 收集 11 处当前术语违规的完整清单（文件路径 + 行内容 + 匹配术语）
- [x] 4.2 逐项分类：可安全修改 / 语境合理需豁免 / 需进一步讨论
- [x] 4.3 对"可安全修改"项执行措辞替换（如"触发"→"启动"、"线索"→"信息"等自然同义词）
- [x] 4.4 更新沉浸感回归测试的豁免列表，添加已审核的术语位置
- [x] 4.5 创建 `openspec/changes/project-audit-optimize/content-audit-report.md` 审计报告
- [x] 4.6 审计 `game-design/剧情推进逻辑.md` 与 `src/data/puzzles.ts` 的答案哈希一致性
- [x] 4.7 审计 `game-design/主线流程.md` 的触发关键词与 `src/data/search-data.ts` 的一致性
- [x] 4.8 记录所有发现的不一致项，标注是否需要立即修复或留待后续变更

## 5. CI 流水线与预提交钩子

- [x] 5.1 安装 Husky 和 lint-staged 到 devDependencies
- [x] 5.2 配置 Husky `pre-commit` 钩子，运行 lint-staged
- [x] 5.3 创建 `.lintstagedrc` 或等效 `lint-staged` 配置（`.astro/.ts` 文件 → eslint + prettier）
- [x] 5.4 创建 `.github/workflows/ci.yml`，包含 `install → lint → test → build` 流水线
- [x] 5.5 在 `package.json` 添加 `check` 脚本（等同于 `astro check && eslint . && vitest run && astro build`）
- [x] 5.6 添加 `engines` 字段到 `package.json`（node >=18）
- [x] 5.7 本地验证 `pnpm check` 全流程通过

## 6. 最终验证

- [x] 6.1 运行 `pnpm test:ci` 确认所有 232+ 测试通过
- [x] 6.2 运行 `pnpm build` 确认 75 页面成功构建
- [x] 6.3 运行 `pnpm lint` 确认零违规
- [x] 6.4 抽查 5 个关键游戏流程页面（搜索 → 帖文 → 登录 → 隐藏页 → 结局）确认功能正常
- [x] 6.5 更新 `CLAUDE.md` 添加新增的 lint/format/ci 命令说明
