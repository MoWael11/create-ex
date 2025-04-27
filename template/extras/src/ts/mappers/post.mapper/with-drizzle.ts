import { SelectPosts } from '@/db/schema';

const postMapper = (post: SelectPosts) => {
  return {
    title: post.title,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
};

export default postMapper;
