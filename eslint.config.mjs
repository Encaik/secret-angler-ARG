import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 全局忽略
  {
    ignores: [
      'dist/**',
      'docs/**',
      'node_modules/**',
      '.astro/**',
      '.claude/**',
      '**/*.d.ts',
    ],
  },

  // JS/TS 文件
  {
    files: ['src/**/*.ts'],
    ignores: ['src/__tests__/**', 'src/scripts/console.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
    },
  },

  // 测试文件 — 允许 console
  {
    files: ['src/__tests__/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // 控制台品牌脚本 — 允许 console
  {
    files: ['src/scripts/console.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Astro 文件
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['src/**/*.astro'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Prettier 兼容（必须放在最后）
  eslintConfigPrettier,
];
