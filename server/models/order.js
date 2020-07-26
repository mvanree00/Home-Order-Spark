const mongoose = require('mongoose'),

const orderSchema = new mongoose.Schema({
    status: {type: String, required: true},
    total: {type: mongoose.Number, required: true},
    items: [{
        itemName: {type: String, required: true, unique: true},
        price: {type: mongoose.Number},
        quantity: {type: mongoose.Number}
    }]
});

module.exports = mongoose.model('order', orderSchema);