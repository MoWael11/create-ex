import { Router } from 'express';
import postRoute from './post.route';
import statusRoute from './status.route';
import catchAllRoute from './catch-all.route';

const api = Router().use('/status', statusRoute).use('/posts', postRoute).all('*', catchAllRoute);

export default Router().use('/', api) as Router;
