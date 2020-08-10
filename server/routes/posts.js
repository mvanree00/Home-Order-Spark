const express = require('express'),
    postRouter = new express.Router(),
    postController = require('../controllers/posts.js');

postRouter.route('/').get(postController.index).post(postController.create); // create post
postRouter.route('/all').get(postController.index) // shows all posts
postRouter.route('/customer/:email').get(postController.show); // get all posts from given email
postRouter.route('/completed/:id').patch(postController.delivered); // complete post (customer)
postRouter.route('/comment/:id').patch(postController.comment); // add comment to post
postRouter.route('/comments/:id').get(postController.comments); // show all comments
module.exports = postRouter;