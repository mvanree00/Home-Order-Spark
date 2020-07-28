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
            const user = await Item.create(req.body);
            res.json({success: true, message: "User created with token", token});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    }
};