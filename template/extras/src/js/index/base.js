// handle error on async functions so middleware can catch it
require('./config/module-alias');
require('express-async-errors');

require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('@/routes/routes');
const cors = require('@/middlewares/cors');
const requestLogger = require('@/middlewares/request-logger');
const { errorHandler } = require('@/middlewares/error-handlers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // accepts only UTF-8
app.set('trust proxy', '127.0.0.1'); // to show real request ip
app.use(express.static('public'));
app.use(requestLogger);

// Routes
app.use(routes);

// Error Handlers
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
