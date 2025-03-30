const { getAllPosts } = require('@/helpers/post.helper');
const mappedPost = require('@/mappers/post.mapper');

const getPosts = async () => {
  const posts = await getAllPosts();

  return posts.map((post) => mappedPost(post));
};

module.exports = { getPosts };
