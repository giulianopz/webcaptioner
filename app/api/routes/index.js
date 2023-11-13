const routes = require('express').Router();

routes.use('/fonts', require('./fonts'));

module.exports = routes;
