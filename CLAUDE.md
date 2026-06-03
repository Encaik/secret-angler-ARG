# CLAUDE.md — 《秘境垂钓者》项目规则

## 项目概述

《秘境垂钓者》是一款以网站为载体的浏览器端 ARG 解谜游戏。游戏主体是一个看起来像真实爱好者社区的网站——"深空古迹探秘导航站"。项目使用 Astro 静态站点生成器，输出纯静态 HTML/CSS/JS。

## 技术栈

- **框架**: Astro 4.x（静态站点生成器，MPA 多页应用）
- **语言**: TypeScript（strict mode）
- **样式**: 纯 CSS（手写，复古小众站点风格，禁用 Tailwind）
- **客户端逻辑**: 原生 JavaScript / TypeScript
- **状态**: localStorage
- **部署**: Vercel / Netlify 静态托管

## 代码架构规则

### 目录职责

```
src/
├── pages/        # Astro 页面，每个 .astro 对应一个路由
├── components/   # 可复用 Astro 组件
├── scripts/      # 客户端 TypeScript（谜题、进度、结局）
├── data/         # 游戏内容数据（纯 TS 对象，不含 UI 逻辑）
├── styles/       # CSS 样式文件
└── assets/       # 静态资源（图片、下载文件）
public/           # 直接映射到根路径（robots.txt 等）
```

### 组件层级

- `Layout.astro` — 全局布局（导航栏、页脚），所有公开页面使用
- `HiddenLayout.astro` — 隐藏/后台页面专用布局（暗色主题）
- 页面组件放在 `pages/` 目录，按板块分目录
- 共享 UI 组件放在 `components/` 目录

### 状态管理

- 所有游戏进度存储在 localStorage，键名 `arg_progress`
- 谜题答案仅存储 SHA-256 哈希值
- 状态读写通过 `src/scripts/progress.ts` 统一接口
- 跨标签页状态通过 `storage` 事件同步

## 命名规范

### 文件命名

- Astro 页面/组件：kebab-case（如 `search-bar.astro`）
- TypeScript 脚本：kebab-case（如 `puzzle-verify.ts`）
- 数据文件：kebab-case（如 `shenci-journal.ts`）
- CSS 文件：kebab-case（如 `home.css`）

### 变量命名

- 谜题 ID：snake_case（如 `stage1_login_password`）
- 页面路由：kebab-case（如 `/alien/sighting-001`）
- 函数命名：camelCase（如 `verifyAnswer`）
- localStorage 键名：snake_case（如 `arg_progress`）

## MPA 设计规则

- **所有内部链接使用 `target="_blank"`**，在新标签页打开
- 每个页面是独立的 HTML 文件
- 导航体验模拟真实网站浏览
- 不创建 SPA 路由，不使用客户端导航

## 内容创作规则

### 语言

- 所有面向玩家的文本使用**简体中文**
- 代码注释优先使用中文（方便策划阅读理解）
- Git 提交信息使用中文

### 叙事一致性

- "林屿"视角：谨慎细腻的观察者（太空/外星爱好者，理论派）
- "沈辞"视角：大胆执着的行动派（古迹/历史爱好者，实地派）
- 所有看似"超自然现象"必须在深层页面揭示为人工骗局
- 线索碎片化：每个页面提供部分信息，拼合才能理解全貌

### 谜题线索规范

- 每个谜题至少提供 2 条不同维度的线索
- 线索来源多样化：页面正文、HTML源码、图片隐写、控制台消息
- 引导方式：暗示而不明示（如"留白处藏通路"而非"查看网页源代码"）
- 谜题难度逐阶段递进

### 真实感原则

- 网站外观和用语参考真实国内小众论坛（牧夫天文论坛、8264户外等）
- 不使用现代设计框架（无 Tailwind、无 Material Design）
- 不用过于精致的动画和过渡效果
- 允许适当的信息密度和"粗糙感"

## 测试要求

### 必须测试

- 所有谜题校验逻辑（正确/错误/边界）
- 结局判定引擎（四种结局 + 边界条件）
- 探索百分比加权计算
- localStorage 状态持久化与重置

### 推荐测试

- 关键词触发跳转正确性
- 隐藏页面 URL 不可通过公开链接访问
- 多周目状态重置完整性

## 四层用户体系

```
第一层：公开探秘者 — 完全公开，所有访客可见
第二层：灰产直播会员 — 半隐藏，需破解密码进入
第三层：团伙内部系统 — 深藏，需高级破解进入
第四层：结局页面 — 条件触发
```

## 安全要求

- robots.txt 屏蔽 /hidden/ /trigger/ /ending/ /member/ 目录
- 隐藏页面添加 `<meta name="robots" content="noindex,nofollow">`
- 谜题答案不存明文，仅存 SHA-256 哈希
- 构建产物检查：移除 Astro 默认注入的框架标记
