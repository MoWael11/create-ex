import { logEvents } from '@/utils/logger';
import { NextFunction, Response, Request } from 'express';

const requestLogger = (req: Request, _: Response, next: NextFunction) => {
  const IP = req.headers['x-forwarded-for'] || req.ip;

  logEvents(`${req.method}\t${req.url} => IP\t${IP}\tUser Agent\t${req.headers['user-agent']}`, 'req.log');
  next();
};

export default requestLogger;
