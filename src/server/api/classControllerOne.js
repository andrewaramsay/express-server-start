'use strict';
// I like this one because each call gets its own instance of the controller (and thus its dependencies).  It also allows for route
// information to be listed sort of 'attribute style' like in C#.  What I don't love about it is it is by far the furthest thing from
// traditional express routes that I have come up with, so it seems a little bit "magic".



// createControllerRouter.js
var _ = require('lodash');
var express = require('express');

function createControllerRouter(Constructor, controllerFactory) {
  var router = express.Router();

  _(Constructor.prototype)
    .filter(_.isFunction)
    .forEach(function (method) {

      var args = method.middleware || [];
      args.unshift(method.route);
      args.push(function () {
        var instance = controllerFactory();
        method.apply(instance, arguments);
      });
      router[method.method].apply(router, args);
    })
    .value();

  return router;
}
module.exports = createControllerRouter;


// routes.config.js
var createControllerRouterz = require('createControllerRouter.js');
function configure(app) {
   app.use(createControllerRouter(ItemsController, () => new ItemsController(/*...dependencies...*/));
}


// itemsController.js
function ItemsController(itemsService) {
  this.itemsService = itemsService;
}

var proto = ItemsController.prototype;
proto.getItems = getItems;
proto.createItem = createItem;

getItems.method = 'get';
getItems.route = '/api/items';
function getItems(req, res, next) {
  // ...
}

createItem.method = 'post';
createItem.route = '/api/items';
createItem.middleware = [someAuthenticationFunction, someValidation, etc];
function createItem(req, res, next) {
  // ...
}

