const mongoose = require('mongoose'),

const storeSchema = new mongoose.Schema({
    storeName: {type: String, required: true},
    address: {type: String, required: true},
    items: [{
        itemName: {type: String, required: true, unique: true},
        description: { type: String, required: true },
        price: {type: mongoose.Number}
    }]
});

module.exports = mongoose.model('store', storeSchema);