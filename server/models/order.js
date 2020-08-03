const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: {type: String, required: true},
    email: {type: String, required:true},
    placed: {type: Date, default: Date.now},
    total: {type: mongoose.Number},
    ids: [{type: String}]
});

module.exports = mongoose.model('order', orderSchema);