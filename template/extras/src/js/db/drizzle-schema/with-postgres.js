const t = require('drizzle-orm/pg-core');
const { pgTable: table } = require('drizzle-orm/pg-core');

const posts = table(
  'posts',
  {
    id: t.serial().primaryKey(),
    title: t.text().notNull(),
    content: t.text().notNull(),
    createdAt: t.timestamp('created_at').notNull().defaultNow(),
    updatedAt: t.timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [t.index('title_idx').on(table.title)],
);

module.exports = { posts };
