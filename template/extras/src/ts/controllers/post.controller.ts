import * as postService from '@/services/post.service';
import { Request, Response, NextFunction } from 'express';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};
