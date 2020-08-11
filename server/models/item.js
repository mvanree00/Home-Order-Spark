const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    email: {type: String, required:true},
    itemName: {type: String, required: true},
    description: { type: String, required: true },
    price: {type: mongoose.Number},
    quantity: {type: mongoose.Number},
    store: {type: String},
    category: {type: String},
    img: {type: String}
});

module.exports = mongoose.model('item', itemSchema);