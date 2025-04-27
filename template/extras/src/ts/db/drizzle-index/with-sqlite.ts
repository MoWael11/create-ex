import { drizzle } from 'drizzle-orm/sqlite';
import * as schema from './schema';

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
  },
  schema,
});
