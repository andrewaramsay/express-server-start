'use strict';
// This one has the benefits over approach one in that the actual router methods are called directly, and will be more recognizable/debuggable
// to someone familiar with express.  It also doesn't have an extra component responsible for doing the magic, it's all just explicitly
// coded the way you normally would code it.  The downsides is that you only get one instance of each class for the lifetime of your application, so
// everything must be stateless.  It also clutters up the controller files a bit with all the extra boilerplate.


// routes.config.js
var configItemsController = require('itemsController.js').configureItemsController;
function configure(app) {
  app.use(configItemsController(new ItemsService()))
}



// itemsController.js
function configureItemsController(itemsService) {
  var router = Router();
  var controller = new ItemsController(itemsService);
  router.get('/api/items', controller.getItems.bind(controller));
  router.post('/api/items', someAuthenticationFunction, someValidation, etc, controller.createItem.bind(controller));
  return router;
}

function ItemsController(itemsService) {
  this.itemsService = itemsService;
}

var proto = ItemsController.prototype;
proto.getItems = getItems;
proto.createItem = createItem;

function getItems(req, res, next) {
  // ...
}

function createItem(req, res, next) {
  // ...
}

module.exports = {
  configureItemsController: configureItemsController,
  ItemsController: ItemsController
};


