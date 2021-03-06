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
            Cart.find({prodId: req.body.prodId, email: req.body.email})
            .then((response) => {
                if(response.length>0){
                    res.json({success: false, message: "Already in cart, alter quantity in cart"})
                }
                else{
                    Cart.create(req.body);
                    res.json({success: true, message: "Cart created."});
                }
            })
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
    remove: async (req, res) => {
        try{
            const cart = await Cart.deleteOne(req.body);
            res.json({success: true, message: "Item deleted"});
        }
        catch(err){
            alert(err);
        }
    },
    removeAll: async (req, res) => {
        try{
            console.log(req.body)
            const cart = await Cart.deleteMany({email: req.body.email});
            res.json({success: true, message: "Item deleted"});
        }
        catch(err){
            alert(err);
        }
    },
    addQuantity: async (req, res) => {
        try{
            const cart = await Cart.findOneAndUpdate({_id: req.params.id}, {$inc: {quantity: 1}});
            res.json({success: true, message: "Quantity updated"});
        }
        catch(err){
            alert(err);
        }
    },
    removeQuantity: async (req, res) => {
        try{
            const cart = await Cart.findOneAndUpdate({_id: req.params.id}, {$inc: {quantity: -1}});
            res.json({success: true, message: "Quantity updated"});
        }
        catch(err){
            alert(err);
        }
    }
};