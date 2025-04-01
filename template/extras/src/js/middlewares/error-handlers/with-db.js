const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} = require('@prisma/client/runtime/library');
const { logEvents } = require('@/utils/logger');
const HttpException = require('@/models/http-exception.model');

const databaseErrorHandler = (err, req, res, next) => {
  if (
    err instanceof PrismaClientKnownRequestError ||
    err instanceof PrismaClientValidationError ||
    err instanceof PrismaClientUnknownRequestError
  ) {
    logEvents(
      `${req.method}\t${req.url} => IP\t${
        req.headers['x-forwarded-for'] || req.ip
      }\tUser Agent\t${req.headers['user-agent']}\nError: ${
        err instanceof PrismaClientKnownRequestError ? err.code : 'Unkown'
      }\tMessage: ${err.message}`,
      'database-err.log',
    );

    return res
      .status(500)
      .json({ message: 'Internal server error', status: 500 });
  }
  next(err);
};

// Express error handling middleware requires 4 parameters.
// The first parameter is the error object.
// If we remove the "next" parameter, Express would treat this as a regular middleware
// instead of an error handler middleware.

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
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

module.exports = { errorHandler, databaseErrorHandler };
