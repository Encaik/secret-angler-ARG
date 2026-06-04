/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Vite define 注入的全局常量（见 astro.config.mjs）
declare const __BASE_PATH__: string;

// Astro 环境类型声明
declare namespace Astro {
  interface Props {
    title?: string;
    description?: string;
    currentNav?: string;
  }
}
