/** @type {import("eslint").Linter.Config} */
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';
import typescriptEslintParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    extends: ['ts/recommended'],
    plugins: {
      // @ts-ignore
      ts: typescriptEslint,
    },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    files: ['src/**/*.{ts,js}'],
    ignores: ['node_modules', '**.*.config.{ts,js}'],
  },
]);
