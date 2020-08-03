const Order = require('../models/order.js');

module.exports = {
    // list orders
    index: async (req, res) => {
        try {
            const orders = await Order.find({});
            res.json(orders);
        } catch(err) {
            alert(err);
        }
    },
    create: async (req, res) => {
        try{
            const order = await Order.create(req.body);
            console.log(req.body);
            res.json({success: true, message: "Order created."});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    // show orders
    show: async (req, res) => {
        try {
            const orders = await Order.find({email: req.params.email});
            console.log(orders)
            res.json(orders);
        } catch(err) {
            alert(err);
        }
    }
};