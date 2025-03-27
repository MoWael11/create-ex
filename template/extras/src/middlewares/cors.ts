import corsOptions from '@/config/cors-options';
import corsMiddleware from 'cors';
import { Request, Response, NextFunction } from 'express';

const cors = (req: Request, res: Response, next: NextFunction) => {
  corsMiddleware(corsOptions)(req, res, next);
};

export default cors;
