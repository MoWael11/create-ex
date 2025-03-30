const { db } = require('@/db/prisma');

const getAllPosts = async () => {
  const posts = await db.post.findMany();

  return posts;
};

module.exports = { getAllPosts };
