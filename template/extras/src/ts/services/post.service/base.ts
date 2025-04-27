import mappedPost from '@/mappers/post.mapper';

export const getPosts = async () => {
  // Simulate fetching posts from a database
  const foundPosts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Content for post 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'Content for post 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return foundPosts.map((post) => mappedPost(post));
};
