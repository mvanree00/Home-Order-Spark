const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

const itemSchema = new mongoose.Schema({
    itemName: {type: String, required: true, unique: true},
    description: { type: String, required: true },
    price: {type: mongoose.Number},
    quantity: {type: mongoose.Number}
});

const storeSchema = new mongoose.Schema({
    storeName: {type: String, required: true},
    address: {type: String, required: true},
    items: [itemSchema]
});

const orderSchema = new mongoose.Schema({
    status: {type: String, required: true},
    total: {type: mongoose.Number, required: true},
    items: [{
        objid: {type: String}
    }]
});

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    atype: {type: String, required: true}, // account type (volunteer, store owner, null if customer)
    store: storeSchema,
    orders: [orderSchema]
});

// adds method to user to create hashed password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// adds method to user to check if password is correct
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// had to add this, checks if password was changed before saving
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password);
    }
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;