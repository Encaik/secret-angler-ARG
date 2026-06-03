import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 纯静态站点，禁用 SSR
  output: 'static',

  // 构建输出到 docs/（GitHub Pages 部署目录）
  outDir: './docs',

  // 开发服务器配置
  server: {
    port: 4321,
    host: true,
  },

  // 构建配置
  build: {
    format: 'directory',
  },
});
