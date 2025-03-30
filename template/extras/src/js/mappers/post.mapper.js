const postMapper = (post) => {
  return {
    name: post.name,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
};

module.exports = postMapper;
