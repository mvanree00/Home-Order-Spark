const express = require('express'),
    jobRouter = new express.Router(),
    jobController = require('../controllers/jobs.js');

jobRouter.route('/').get(jobController.index).post(jobController.create); // create job
jobRouter.route('/customer/:email').get(jobController.show); // get all jobs from given email
jobRouter.route('/volunteer').get(jobController.open); // show all unaccepted jobs (volunteer)
jobRouter.route('/email/:email').get(jobController.current); // display volunteers accepted job
jobRouter.route('/volunteer/:id').patch(jobController.accepted); // accept job (volunteer)
jobRouter.route('/completed/:id').patch(jobController.delivered); // complete job (volunteer)
jobRouter.route('/cancel/:id').patch(jobController.canceled); // cancel job (customer)
module.exports = jobRouter;