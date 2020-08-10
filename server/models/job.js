const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    status: {type: String, required: true},
    email: {type: String, required:true},
    placed: {type: Date, default: Date.now},
    volunteer: {type: String},
    address: {type: String},
    title: {type: String},
    info: {type: String}
});

module.exports = mongoose.model('job', jobSchema);