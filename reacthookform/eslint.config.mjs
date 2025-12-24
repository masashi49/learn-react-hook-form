import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Ignore
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  // 共通ルール（ts / tsx / js / jsx）
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // 未使用 import は即エラー
      'unused-imports/no-unused-imports': 'error',

      // 未使用変数もエラー（_ 付きは許可）
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // 二重検知防止
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // tsx 専用（Component ルール）
  {
    files: ['**/*.tsx'],
    rules: {
      // JSXで使われる Component 名は PascalCase 必須
      'react/jsx-pascal-case': 'error',

      // Component 定義形式の統一（任意だが良い）
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
]);
