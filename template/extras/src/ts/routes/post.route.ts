import { Router } from 'express';
import { getPosts } from '@/controllers/post.controller';

const router: Router = Router();

/**
 * Get all posts
 * @auth optional
 * @route {GET} /posts
 * @returns {Object} response - An object containing a list of posts
 */
router.route('/').get(getPosts);

export default router;
