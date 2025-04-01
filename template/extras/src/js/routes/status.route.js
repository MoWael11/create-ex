const { Router } = require('express');

const router = Router();

/**
 * Get server status
 * @route {GET} /status
 * @auth optional
 */
router.route('/').get((req, res) => {
  res.sendStatus(200);
});

module.exports = router;
