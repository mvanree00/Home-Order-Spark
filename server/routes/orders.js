const express = require('express'),
    orderRouter = new express.Router(),
    orderController = require('../controllers/orders.js');

orderRouter.route('/').get(orderController.index).post(orderController.create); // create order
orderRouter.route('/customer/:email').get(orderController.show); // show all orders
module.exports = orderRouter;