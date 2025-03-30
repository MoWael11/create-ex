require('dotenv/config');
const allowedOrigins = require('./allowed-origins');

const corsOptions = {
  origin: (origin, callback) => {
    if (
      (origin && allowedOrigins.indexOf(origin) !== -1) ||
      (!origin && process.env.NODE_ENV !== 'production')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = corsOptions;
