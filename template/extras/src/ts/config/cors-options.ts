import 'dotenv/config';
import allowedOrigins from './allowed-origins';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      (origin && allowedOrigins.indexOf(origin) !== -1) ||
      ((!origin || allowedOrigins.includes('*')) && process.env.NODE_ENV !== 'production')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export default corsOptions;
