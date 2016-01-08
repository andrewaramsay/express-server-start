'use strict';

var Router = require('express').Router;
var ItemsService = require('../business/itemsService');

var router = Router();

router.get('/api/items', function (req, res, next) {
  var itemsService = new ItemsService();
  var query = {
    limit: req.query.limit || 25,
    offset: req.query.offset || 0
  };

  itemsService.getItems(query, function (err, itemsResponse) {
    if (err) {
      // There's nothing special about returning next, you just call next, then return to prevent having to put the rest in an else block.
      // passing anything to next() will make it fall into the global error handler configured in express.config.js
      return next(err);
    }

    res.json({
      items: itemsResponse.items,
      totalCount: itemsResponse.totalCount
    });
  });
});

router.post('/api/items', function (req, res, next) {
  var item = req.body.item;

  var itemsService = new ItemsService();
  itemsService.createItem(item, function (err, id) {
    if (err) {
      return next(err);
    }

    res.status(201).json({
      id: id
    });
  });

});


module.exports = router;
