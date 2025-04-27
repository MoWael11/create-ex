const { drizzle } = require('drizzle-orm/libsql');
const schema = require('./schema');

const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
  },
  schema,
});

module.exports = { db };
