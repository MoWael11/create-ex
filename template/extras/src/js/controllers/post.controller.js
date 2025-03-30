const postService = require('@/services/post.service');

const getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPosts };
