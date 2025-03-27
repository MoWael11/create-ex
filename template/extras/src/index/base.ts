// handle error on async functions so middleware can catch it
import 'express-async-errors';

import cors from './middlewares/cors';
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import routes from '@/routes/routes';
import requestLogger from '@/middlewares/request-logger';
import { errorHandler } from '@/middlewares/error-handlers';

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
