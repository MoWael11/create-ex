const { Router } = require('express');
const { getPosts } = require('@/controllers/post.controller');

const router = Router();

/**
 * Get all posts
 * @auth optional
 * @route {GET} /posts
 * @returns {Object} response - An object containing a list of posts
 */
router.route('/').get(getPosts);

module.exports = router;
