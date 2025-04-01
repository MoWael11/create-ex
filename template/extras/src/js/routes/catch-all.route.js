const { Router } = require('express');

const router = Router();

/**
 * Returns 404 error
 * @route {GET} /status
 * @auth optional
 */
router.route('/').get((_, res) => {
  res.sendStatus(404);
});

module.exports = router;
