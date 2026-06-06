## Why

项目已积累 77 个 Astro 页面、~12k 行代码、232 个通过测试的规模，但在代码组织、样式管理、工具链和 CI 方面存在技术债务。随着内容持续增长，缺乏 lint 规范、单文件 CSS 膨胀、无自动化质量门禁等问题将降低开发效率并增加回归风险。在添加更多谜题/页面前，应巩固基础。

## What Changes

- 引入 ESLint + Prettier 代码规范工具，统一代码风格
- 拆分 `global.css`（559 行）为按职责组织的多个 CSS 文件，消除 11 处内联 `<style>` 块
- 处理 8 个 Astro 编译提示，消除构建噪音
- 审查并清理 11 处沉浸感术语违规（`hidden/dead-drop/` 中的"触发"和"结局"字样）
- 为 `pnpm test:ci` 添加 CI 就绪的构建验证流程，含 Husky 预提交钩子
- 审计游戏设计文档（`剧情推进逻辑.md`、`主线流程.md`）与代码实现的一致性
- 消除各页面间的重复布局模式，抽取共享组件
- 添加 `package.json` 的 `engines` 和 `ci` 脚本

## Capabilities

### New Capabilities

- `code-quality-tooling`: ESLint + Prettier 配置，含 Astro 和 TypeScript 规则集，用于自动化代码风格和质量检查
- `css-modularization`: 从单一 global.css 拆分为按职责组织的样式文件，消除内联 `<style>` 块
- `ci-pipeline`: 预提交钩子（Husky + lint-staged）和 CI 构建验证流水线
- `content-audit`: 沉浸感术语合规检查与游戏设计文档一致性审计

### Modified Capabilities

<!-- 无现有 specs 需要修改 -->

## Impact

- 所有 `src/pages/**/*.astro` 文件 — 移除内联 `<style>` 块，改用全局样式类
- `src/styles/` — 从 1 个文件扩展为按职责拆分的多文件结构
- `package.json` — 新增 devDependencies 和 scripts
- 根目录新增配置文件：`.eslintrc.cjs`、`.prettierrc`、`.lintstagedrc`
- CI 就绪：新增 `.github/workflows/ci.yml`（或等效配置）
- `src/pages/hidden/dead-drop/` — 审查游戏术语措辞
- `game-design/` — 可能更新以反映当前实现状态
