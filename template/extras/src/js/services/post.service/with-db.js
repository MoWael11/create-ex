const { db } = require('@/db');
const mappedPost = require('@/mappers/post.mapper');

const getPosts = async () => {
  const posts = await db.post.findMany();

  return posts.map((post) => mappedPost(post));
};

module.exports = { getPosts };
