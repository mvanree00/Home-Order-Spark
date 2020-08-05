const express = require('express'),
    orderRouter = new express.Router(),
    orderController = require('../controllers/orders.js');

orderRouter.route('/').get(orderController.index).post(orderController.create); // create order
orderRouter.route('/customer/:email').get(orderController.show); // get all orders from given email
orderRouter.route('/volunteer').get(orderController.open); // show all unaccepted orders (volunteer)
orderRouter.route('/email/:email').get(orderController.current); // display volunteers accepted order
orderRouter.route('/volunteer/:id').patch(orderController.accepted); // accept order (volunteer)
orderRouter.route('/completed/:id').patch(orderController.delivered); // complete order (volunteer)
orderRouter.route('/cancel/:id').patch(orderController.canceled); // cancel order (customer)
module.exports = orderRouter;