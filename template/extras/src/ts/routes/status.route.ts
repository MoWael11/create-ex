import { Router, Request, Response } from 'express';

const router: Router = Router();

/**
 * Get server status
 * @route {GET} /status
 * @auth optional
 */
router.route('/').get((_: Request, res: Response) => {
  res.sendStatus(200);
});

module.exports = router;
