import { Prisma } from '@prisma/client';

const postMapper = (post: Prisma.Post) => {
  return {
    title: post.title,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
};

export default postMapper;
