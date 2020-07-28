const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    email: {type: String, required:true},
    itemName: {type: String, required: true, unique: true},
    description: { type: String, required: true },
    price: {type: mongoose.Number},
    quantity: {type: mongoose.Number}
});

module.exports = mongoose.model('item', itemSchema);