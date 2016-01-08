'use strict';

var bodyParser = require('body-parser');

function configure(app, config) {
  app.use(bodyParser.json({ limit: config.requestSizeLimit }));
}



// Must be called after all routers, so put in a separate function
function configureErrorHandler(app) {
  app.use(globalErrorHandler);
}

function globalErrorHandler(err, req, res, next) {
  console.error(err.message);

  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    name: err.name,
    message: err.message,
    stack: err.stack
  });
}


module.exports = {
  configure: configure,
  configureErrorHandler: configureErrorHandler
};
