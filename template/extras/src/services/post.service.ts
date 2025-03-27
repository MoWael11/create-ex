import { getAllPosts } from '@/helpers/post.helper';
import mappedPost from '@/mappers/post.helper';

export const getPosts = async () => {
  const posts = await getAllPosts();

  return posts.map((post) => mappedPost(post));
};
