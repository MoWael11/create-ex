const { Router } = require('express');
const postRoute = require('./post.route');
const statusRoute = require('./status.route');
const catchAllRoute = require('./catch-all.route');

const api = Router().use('/status', statusRoute).use('/posts', postRoute).use('*', catchAllRoute);

module.exports = Router().use('/', api);
