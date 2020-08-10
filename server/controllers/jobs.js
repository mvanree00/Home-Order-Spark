const Job = require('../models/job.js');
module.exports = {
    // list orders
    index: async (req, res) => {
        try {
            const jobs = await Job.find({});
            res.json(jobs);
        } catch(err) {
            alert(err);
        }
    },
    create: async (req, res) => {
        try{
            const job = await Job.create(req.body);
            res.json({success: true, message: "Job created."});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    // show orders customer
    show: async (req, res) => {
        try {
            const jobs = await Job.find({email: req.params.email}).sort('-placed');
            res.json(jobs);
        } catch(err) {
            alert(err);
        }
    },
    open: async (req, res) => {
        try {
            const jobs = await Job.find({status: 'placed'});
            res.json(jobs);
        } catch(err) {
            alert(err);
        }
    },
    accepted: async (req, res) => {
        try {
            const job = await Job.findOneAndUpdate({_id: req.params.id},{status: "accepted", volunteer: req.body.email});
            res.json({success: true, message: "Job Accepted", job});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    canceled: async (req, res) => {
        try {
            const job = await Job.findOneAndUpdate({_id: req.params.id},{status: "canceled"});
            res.json({success: true, message: "Job Canceled", job});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    },
    current: async (req, res) => {
        try {
            const jobs = await Job.find({volunteer: req.params.email}).sort('-placed');
            res.json(jobs);
        } catch(err) {
            alert(err);
        }
    },
    delivered: async (req, res) => {
        try {
            const job = await Job.findOneAndUpdate({_id: req.params.id},{status: "completed"});
            res.json({success: true, message: "Job Completed", job});
        } catch(err) {
            res.json({success: false, code: err.code});
        }
    }
};