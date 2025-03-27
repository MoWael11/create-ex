/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // Express.js
  expressjs: '4.21.2',

  // Prisma
  prisma: '^5.14.0',
  '@prisma/client': '^5.14.0',
  '@prisma/adapter-planetscale': '^5.14.0',

  '@planetscale/database': '^1.19.0',
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;
