import globals from 'globals';
import { defineConfig } from 'eslint/config';

module.exports = defineConfig([
  {
    extends: ['ts/recommended'],
    plugins: {
      ts: require('typescript-eslint'),
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
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
