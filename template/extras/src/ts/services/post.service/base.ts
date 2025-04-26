import mappedPost from '@/mappers/post.mapper';

export const getPosts = async () => {
  // Returns a static array of posts for demonstration purposes
  const posts = [
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

  return posts.map((post) => mappedPost(post));
};
