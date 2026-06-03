/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Astro 环境类型声明
declare namespace Astro {
  interface Props {
    title?: string;
    description?: string;
    currentNav?: string;
  }
}
