const Item = require('../models/item.js');

module.exports = {
    // creates new user
    index: async (req, res) => {
        try {
            const items = await Item.find({});
            res.json(items);
        } catch(err) {
            alert(err);
        }
    },
    create: async (req, res) => {
        try{
            const item = await Item.create(req.body);
            res.json({success: true, message: "Order created."});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    show: async (req, res) => {
        try {
            const items = await Item.find({email: req.params.email});
            console.log(items)
            res.json(items);
        } catch(err) {
            alert(err);
        }
    },
};