const express = require('express'),
    cartRouter = new express.Router(),
    cartController = require('../controllers/carts.js');

cartRouter.route('/').get(cartController.index).post(cartController.create);
cartRouter.route('/').get(cartController.index).delete(cartController.remove);
cartRouter.route('/add/:id').patch(cartController.addQuantity);
cartRouter.route('/remove/:id').patch(cartController.removeQuantity);
cartRouter.route('/:email').get(cartController.show);
cartRouter.route('/reset').delete(cartController.removeAll);
module.exports = cartRouter;