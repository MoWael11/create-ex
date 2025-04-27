const schema = require('./schema');
const { drizzle } = require('drizzle-orm/node-postgres');

const db = drizzle({
  connection: process.env.DATABASE_URL,
  schema,
});

module.exports = { db };
