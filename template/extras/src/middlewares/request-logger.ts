import { logEvents } from '@/utils/logger';
import { NextFunction, Response, Request } from 'express';

const requestLogger = (req: Request, _: Response, next: NextFunction) => {
  const fromDashboard = req.headers?.origin === process.env.DASHBOARD_URL;
  const IP = req.headers['x-forwarded-for'] || req.ip;

  logEvents(
    `${req.method}\t${req.url} => IP\t${IP}\tUser Agent\t${
      req.headers['user-agent']
    }${
      fromDashboard && req.auth?.user ? `\tUser ID\t${req.auth.user.id}` : ''
    }`,
    `${fromDashboard ? 'req-dashboard.log' : 'req.log'}`,
  );
  next();
};

export default requestLogger;
