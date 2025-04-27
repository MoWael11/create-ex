import { db } from '@/db';
import mappedPost from '@/mappers/post.mapper';

export const getPosts = async () => {
  const posts = await db.post.findMany();

  return posts.map((post) => mappedPost(post));
};
