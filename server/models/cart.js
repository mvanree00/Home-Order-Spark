const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    email: {type: String, required:true},
    prodId: {type: String, required:true},
    quantity: {type: Number},
});

module.exports = mongoose.model('cart', cartSchema);