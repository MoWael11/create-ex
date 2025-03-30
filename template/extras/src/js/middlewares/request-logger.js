const { logEvents } = require('@/utils/logger');

const requestLogger = (req, _, next) => {
  const IP = req.headers['x-forwarded-for'] || req.ip;

  logEvents(
    `${req.method}\t${req.url} => IP\t${IP}\tUser Agent\t${req.headers['user-agent']}`,
    'req.log',
  );
  next();
};

module.exports = requestLogger;
