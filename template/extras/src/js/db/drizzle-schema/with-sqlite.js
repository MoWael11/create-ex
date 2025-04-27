const { sql } = require('drizzle-orm');
const { sqliteTable: table } = require('drizzle-orm/sqlite-core');
const t = require('drizzle-orm/sqlite-core');

const posts = table(
  'posts',
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    title: t.text().notNull(),
    content: t.text().notNull(),
    createdAt: t
      .integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: t
      .integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [t.index('title_idx').on(table.title)],
);

module.exports = { posts };
