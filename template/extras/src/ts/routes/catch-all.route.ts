import { Router, Request, Response } from 'express';

const router: Router = Router();

/**
 * Returns 404 error
 * @route {GET} /status
 * @auth optional
 */
router.route('/').get((_: Request, res: Response) => {
  res.sendStatus(404);
});

module.exports = router;
