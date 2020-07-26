const mongoose = require('mongoose'),

const orderSchema = new mongoose.Schema({
    status: {type: String, required: true},
});

module.exports = mongoose.model('order', orderSchema);