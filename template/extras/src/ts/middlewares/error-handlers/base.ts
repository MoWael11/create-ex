import { logEvents } from '@/utils/logger';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import HttpException from '@/models/http-exception.model';

// Express error handling middleware requires 4 parameters.
// The first parameter is the error object.
// If we remove the "_" parameter, Express would treat this as a regular middleware
// instead of an error handler middleware.
const errorHandler: ErrorRequestHandler = async (
  err: Error | HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction,
) => {
  if (err instanceof HttpException && err.errorCode) {
    return res.status(err.errorCode).json({ message: err.message, status: err.errorCode });
  }

  const IP = (req?.headers && req?.headers['x-forwarded-for']) || req.ip;

  logEvents(
    `${req.method}\t${req.url} => IP\t${IP}\tUser Agent\t${req.headers['user-agent']}\n${err.name}: ${err.message}`,
    'err.log',
  );

  if (err instanceof SyntaxError && 'body' in err)
    return res.status(422).json({ error: 'Invalid JSON syntax', status: 422 });

  return res.status(500).json({ message: 'Internal server error', status: 500 });
};

export { errorHandler };
