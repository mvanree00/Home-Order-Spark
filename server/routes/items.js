const express = require('express'),
    itemRouter = new express.Router(),
    itemController = require('../controllers/items.js');

itemRouter.route('/').get(itemController.index).post(itemController.create);
itemRouter.route('/search/:id').get(itemController.cart);
itemRouter.route('/:email').get(itemController.show);
module.exports = itemRouter;