import db from '@/db/prisma';

export const getAllPosts = async () => {
  const posts = await db.post.findMany();

  return posts;
};
