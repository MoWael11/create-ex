interface Post {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const postMapper = (post: Post) => {
  return {
    name: post.name,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
};

export default postMapper;
