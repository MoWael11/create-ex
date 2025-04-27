const { Client } = require('@planetscale/database');
const { drizzle } = require('drizzle-orm/planetscale-serverless');
const schema = require('./schema');

const db = drizzle(new Client({ url: process.env.DATABASE_URL }), {
  schema,
});

module.exports = { db };
