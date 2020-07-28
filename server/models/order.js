const mongoose = require('mongoose'),

const orderSchema = new mongoose.Schema({
    status: {type: String, required: true},
    total: {type: mongoose.Number, required: true},
    email: {type: String, required:true},
    ids: [{type: String}]
});

module.exports = mongoose.model('order', orderSchema);