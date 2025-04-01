/** @type {import("eslint").Linter.Config} */
const globals = require('globals');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  {
    extends: ['js/recommended'],
    plugins: {
      js: require('@eslint/js'),
    },
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
      globals: globals.node,
    },
    rules: {
      // your rules
    },
    files: ['src/**/*.{js,mjs,cjs}'],
    ignores: ['node_modules', '**.*.config.{js,mjs,cjs}'],
  },
]);
