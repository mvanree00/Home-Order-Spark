const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    status: {type: String, required: true},
    email: {type: String, required:true},
    placed: {type: Date, default: Date.now},
    title: {type: String},
    info: {type: String},
    comments: [{type: String}]
});

module.exports = mongoose.model('post', postSchema);