import { type InferSelectModel } from 'drizzle-orm';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import * as t from 'drizzle-orm/mysql-core';

export const posts = table(
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

export type SelectPosts = InferSelectModel<typeof posts>;
