import { Router } from 'express';

import postRoute from './post.route';

const api = Router().use('/posts', postRoute);

export default Router().use('/', api) as Router;
