/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // Typescript
  tsup: '^8.4.0',
  typescript: '^5.5.3',
  '@types/body-parser': '^1.19.5',
  '@types/cors': '^2.8.17',
  '@types/express': '^4.17.21',
  '@types/node': '^20.14.1',
  rimraf: '^6.0.1',
  tslib: '^2.8.1',

  // Eslint
  eslint: '^9.23.0',
  globals: '^16.0.0',
  'typescript-eslint': '^8.29.0',
  '@typescript-eslint/parser': '^8.29.0',

  // Socket.IO
  'socket.io': '^4.8.1',

  // Drizzle
  'drizzle-orm': '^0.43.1',
  'drizzle-kit': '^0.31.0',
  pg: '^8.15.6',
  '@types/pg': '^8.11.14',
  '@libsql/client': '^0.15.4',
  mysql2: '^3.14.1',

  // Prisma
  prisma: '^6.5.0',
  '@prisma/client': '^6.5.0',
  '@prisma/adapter-planetscale': '^6.5.0',

  '@planetscale/database': '^1.19.0',
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;
