require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

app.use(bodyParser.json());
app.use((error, request, response, next) => {
  if (error !== null) {
    return response.sendStatus(400);
  }
  return next();
});

//   app.use(rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   }));

app.use('/', routes);

module.exports = {
  path: '/api',
  handler: app,
};
