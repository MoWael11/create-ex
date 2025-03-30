const { Router } = require('express');
const postRoute = require('./post.route');

const api = Router().use('/posts', postRoute);

module.exports = Router().use('/', api);
