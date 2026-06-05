import { defineConfig } from 'astro/config';

// 二级目录部署：GitHub Pages 项目站点需要 /repo-name/ 作为 base
// 用户/组织站点（根路径）或自定义域名使用 '/'。
//
// 通过环境变量 BASE_URL 传入子目录名（不带前后斜杠），由脚本拼接为标准路径。
// 使用 Vite define 注入 __BASE_PATH__ 以避免 Windows Git Bash 下
// import.meta.env.BASE_URL 被 MSYS2 转译为文件系统路径的问题。
//
// 示例：
//   dev:                    pnpm dev                          → 根目录
//   GitHub Pages 构建:      BASE_URL=secret-angler-ARG pnpm build → 二级目录
const BASE_PATH = process.env.BASE_URL
  ? '/' + process.env.BASE_URL.replace(/^\/|\/$/g, '') + '/'
  : '/';

// https://astro.build/config
export default defineConfig({
  // 虚构站点域名——用于增强沉浸感（sitemap 手动维护在 public/ 目录）
  site: 'https://tanmizhe.org',

  output: 'static',

  base: BASE_PATH,

  outDir: './docs',

  server: {
    port: 4321,
    host: true,
  },

  build: {
    format: 'directory',
  },

  vite: {
    define: {
      // 注入全局常量，在所有 .astro 和 .ts 文件中可用
      // 比 import.meta.env.BASE_URL 更稳定，不受 MSYS2 路径转译影响
      __BASE_PATH__: JSON.stringify(BASE_PATH),
    },
  },
});
