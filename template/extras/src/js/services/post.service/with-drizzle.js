const { db } = require('@/db');
const { posts } = require('@/db/schema');
const mappedPost = require('@/mappers/post.mapper');

const getPosts = async () => {
  const foundPosts = await db.select().from(posts);
  return foundPosts.map((post) => mappedPost(post));
};

module.exports = { getPosts };
