const Order = require('../models/order.js');
const Item = require('../models/item.js');
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
            const orders = await Order.find({email: req.params.email}).sort('-placed');
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
            const order = await Order.findOneAndUpdate({_id: req.params.id},{status: "accepted", volunteer: req.body.email});
            res.json({success: true, message: "Order Accepted", order});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    canceled: async (req, res) => {
        try {
            console.log(req.params.id)
            const order = await Order.findOneAndUpdate({_id: req.params.id},{status: "canceled"});
            res.json({success: true, message: "Order Canceled", order});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    current: async (req, res) => {
        try {
            const orders = await Order.find({volunteer: req.params.email}).sort('-placed');
            res.json(orders);
        } catch(err) {
            alert(err);
        }
    },
    delivered: async (req, res) => {
        try {
            const order = await Order.findOneAndUpdate({_id: req.params.id},{status: "delivered"});
            res.json({success: true, message: "Order Delivered", order});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    items: async (req, res) => {
        try {
            const items = await Order.find({_id: req.params.id})
            objs = await Item.find({'_id': {$in: items[0].ids}})
            res.json(objs);
        } catch(err) {
            alert(err);
        }
    }
};