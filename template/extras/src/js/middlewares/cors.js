const corsOptions = require('@/config/cors-options');
const corsMiddleware = require('cors');

const cors = (req, res, next) => {
  corsMiddleware(corsOptions)(req, res, next);
};

module.exports = cors;
