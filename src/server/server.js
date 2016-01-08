'use strict';

var express = require('express');
var config = require('./startup/config');
var expressConfig = require('./startup/express.config');
var routesConfig = require('./startup/routes.config');
var httpServerConfig = require('./startup/httpServer.config');

var app = express();

expressConfig.configure(app, config);
// Add other configs here, such as passport, mongoose, logging, etc.
routesConfig.configure(app);
expressConfig.configureErrorHandler(app);

httpServerConfig.startServer(app, config);
