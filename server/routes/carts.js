const express = require('express'),
    cartRouter = new express.Router(),
    cartController = require('../controllers/carts.js');

cartRouter.route('/').get(cartController.index).post(cartController.create);
cartRouter.route('/:email').get(cartController.show);
module.exports = cartRouter;