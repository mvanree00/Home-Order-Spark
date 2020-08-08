const Cart = require('../models/cart.js');
const Item = require('../models/item.js');

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
            if(Item.find({_id: req.body.prodId})){
                res.json({success: false, message: "Already in cart, alter quantity in cart"})
            }
            else{
                const cart = await Cart.create(req.body);
                res.json({success: true, message: "Cart created."});
            }
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    show: async (req, res) => {
        try {
            const carts = await Cart.find({email: req.params.email});
            res.json(carts);
        } catch(err) {
            alert(err);
        }
    },
};