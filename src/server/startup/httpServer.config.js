'use strict';

var http = require('http');

function startServer(app, config) {
  var server = http.createServer(app);

  console.log('Starting server on port ' + config.httpPort + '...');
  server.listen(config.httpPort, function (err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Server started.');
  });
}

module.exports = {
  startServer: startServer
};
