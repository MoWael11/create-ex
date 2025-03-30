import { defineConfig } from 'tsup';

const isDev = process.env.npm_lifecycle_event === 'dev';

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['cjs'],
  minify: !isDev,
  target: 'ES2022',
  outDir: 'dist',
  onSuccess: isDev ? 'node dist/index.js' : undefined,
});
