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
            res.json(orders);
        } catch(err) {
            alert(err);
        }
    },
    open: async (req, res) => {
        try {
            const orders = await Order.find({status: 'placed'});
            res.json(orders);
        } catch(err) {
            alert(err);
        }
    },
    accepted: async (req, res) => {
        try {
            console.log(req.body.email)
            const order = await Order.findOneAndUpdate({_id: req.params.id},{status: "accepted", volunteer: req.body.email});
            res.json({success: true, message: "Order Accepted", order});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    current: async (req, res) => {
        try {
            const orders = await Order.find({volunteer: req.params.email});
            res.json(orders);
        } catch(err) {
            alert(err);
        }
    },
    delivered: async (req, res) => {
        try {
            console.log(req.body.email)
            const order = await Order.findOneAndUpdate({_id: req.params.id},{status: "delivered"});
            res.json({success: true, message: "Order Delivered", order});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    }
};