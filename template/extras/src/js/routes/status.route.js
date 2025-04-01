const { Router } = require('express');

const router = Router();

/**
 * Get server status
 * @route {GET} /status
 * @auth optional
 */
router.route('/').get((_, res) => {
  res.sendStatus(200);
});

module.exports = router;
