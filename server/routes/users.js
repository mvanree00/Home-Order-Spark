const express = require('express'),
    userRouter = new express.Router(),
    userController = require('../controllers/users.js'),
    verifyToken = require('../authHelperFunctions').verifyToken;

userRouter.route('/').get(userController.index).post(userController.create);

userRouter.post('/authenticate', userController.authenticate);

userRouter.use(verifyToken);
userRouter.route('/:id').get(userController.show).patch(userController.update).delete(userController.destroy);
  
module.exports = userRouter;