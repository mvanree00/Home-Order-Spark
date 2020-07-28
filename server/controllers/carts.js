const Cart = require('../models/cart.js');

module.exports = {
    index: async (req, res) => {
        try {
            const carts = await Cart.find({});
            res.json(carts);
        } catch(err) {
            alert(err);
        }
    },
    create: async (req, res) => {
        try{
            const cart = await Cart.create(req.body);
            res.json({success: true, message: "Cart created."});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    show: async (req, res) => {
        try {
            const carts = await Cart.find({email: req.params.email});
            console.log(carts)
            res.json(carts);
        } catch(err) {
            alert(err);
        }
    },
};