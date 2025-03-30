// Returns a static array of posts for demonstration purposes.
const getAllPosts = async () => {
  await new Promise((r) => setTimeout(r, 3000));

  return [
    {
      id: 1,
      name: 'Post 1',
      content: 'Content for post 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Post 2',
      content: 'Content for post 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

module.exports = { getAllPosts };
