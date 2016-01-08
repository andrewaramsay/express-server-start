'use strict';
var itemsController = require('../api/itemsController.js');

function configure(app) {
  app.use(itemsController);
  // Add other controllers here
}


module.exports = {
  configure: configure
};
