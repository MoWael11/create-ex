import { db } from '@/db';
import { posts } from '@/db/schema';
import mappedPost from '@/mappers/post.mapper';

export const getPosts = async () => {
  const foundPosts = await db.select().from(posts);
  return foundPosts.map((post) => mappedPost(post));
};
