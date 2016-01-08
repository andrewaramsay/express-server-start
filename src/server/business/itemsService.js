'use strict';

function ItemsService() {
}

var proto = ItemsService.prototype;
proto.getItems = getItems;
proto.createItem = createItem;

function getItems(query, callback) {
  var response = {
    items: [
      {
        name: 'foo'
      },
      {
        name: 'bar'
      },
      {
        name: 'bas'
      }
    ],
    totalCount: 500
  };

  callback(null, response);
}

function createItem(item, callback) {
  console.log(item);
  if (!item) {
    return callback(new Error('You must supply an item!'));
  }

  var newId = 56;
  callback(null, newId);
}

module.exports = ItemsService;
