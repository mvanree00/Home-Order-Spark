const Post = require('../models/post.js');
module.exports = {
    // list orders
    index: async (req, res) => {
        try {
            const posts = await Post.find({}).sort('-placed');
            res.json(posts);
        } catch(err) {
            alert(err);
        }
    },
    create: async (req, res) => {
        try{
            const post = await Post.create(req.body);
            res.json({success: true, message: "Post created."});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    // show orders customer
    show: async (req, res) => {
        try {
            const posts = await Post.find({email: req.params.email}).sort('-placed');
            res.json(posts);
        } catch(err) {
            alert(err);
        }
    },
    comment: async (req, res) => {
        try {
            let arr = req.params.id.split(':');
            const post = await Post.findOneAndUpdate({_id: arr[0]}, {$push: {comments: arr[1]}});
            res.json({success: true, message: "Comment Completed", post});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    delivered: async (req, res) => {
        try {
            const post = await Post.findOneAndUpdate({_id: req.params.id},{status: "Answered"});
            res.json({success: true, message: "Post Completed", post});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    comments: async (req, res) => {
        try {
            console.log(req.body)
            const orders = await Post.find({_id: req.params.id});
            res.json(orders);
        } catch(err) {
            alert(err);
        }
    },
};