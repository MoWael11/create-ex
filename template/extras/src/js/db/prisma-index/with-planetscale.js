const { Client } = require('@planetscale/database');
const { PrismaPlanetScale } = require('@prisma/adapter-planetscale');
const { PrismaClient } = require('@prisma/client');

const psClient = new Client({ url: process.env.DATABASE_URL });

const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    adapter: new PrismaPlanetScale(psClient),
  });

const globalForPrisma = globalThis;

const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

module.exports = { db };
