/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  './src/**/*.ts': ['prettier --write', 'eslint'],
};
