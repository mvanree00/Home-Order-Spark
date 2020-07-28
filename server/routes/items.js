const express = require('express'),
    itemRouter = new express.Router(),
    itemController = require('../controllers/items.js');

itemRouter.route('/').get(itemController.index).post(itemController.create);
itemRouter.post('/add',itemController.create);
  
module.exports = itemRouter;