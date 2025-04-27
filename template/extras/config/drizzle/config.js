/** @type {import("drizzle-orm").defineConfig} */
const { defineConfig } = require('drizzle-kit');
require('dotenv').config();

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.js',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
