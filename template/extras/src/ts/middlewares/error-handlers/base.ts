import { logEvents } from '@/utils/logger';
import { ErrorRequestHandler } from 'express';
import HttpException from '@/models/http-exception.model';

const errorHandler: ErrorRequestHandler = async (
  err: Error | HttpException,
  req,
  res,
  next,
) => {
  if (err instanceof HttpException && err.errorCode) {
    return res
      .status(err.errorCode)
      .json({ message: err.message, status: err.errorCode });
  }

  logEvents(
    `${req.method}\t${req.url} => IP\t${
      req.headers['x-forwarded-for'] || req.ip
    }\tUser Agent\t${req.headers['user-agent']}\n${err.name}: ${err.message}`,
    'err.log',
  );

  if (err instanceof SyntaxError && 'body' in err)
    return res.status(422).json({ error: 'Invalid JSON syntax', status: 422 });

  return res
    .status(500)
    .json({ message: 'Internal server error', status: 500 });
};

export { errorHandler };
