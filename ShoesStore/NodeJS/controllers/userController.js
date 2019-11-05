const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { User } = require('../models/users');

router.get('/', (req, res) => {
    User.find((err, doc) => {
        if(!err){
            res.json(doc);
        }
        else{
            res.json({
                status: false,
                message: "Error in retriving Account: " + 
                JSON.stringify(err, undefined, 2)
            })
        }
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id).exec((err, doc) => {
        if(err){
            res.json({
                status: false,
                message: err,
                obj: null
            });
        }
        else if(!doc){
            res.json({
                status: false,
                message: 'Can not find a user with this id!',
                obj: null
            });
        }
        else{
            res.json({
                status: true,
                message: 'Success',
                obj: doc
            });
        }
    });
});

router.get('/account/:account_id', (req, res) => {
    User.findOne({account_id: req.params.account_id}).exec((err, doc) => {
        if(err){
            res.json({
                status: false,
                message: err,
                obj: null
            });
        }
        else if(!doc){
            res.json({
                status: false,
                message: 'Can not find a user with this account_id!',
                obj: null
            });
        }
        else{
            res.json({
                status: true,
                message: 'Success',
                obj: doc
            });
        }
    });
});

router.post('/', (req, res) => {
    var user = new User({
        fullname: req.body.fullname,
        mobile_number: req.body.mobile_number,
        address: req.body.address,
        account_id: req.body.account_id
    });
    User.collection.insertOne(user, (err, data) => {
        if(err){
            res.json({
                status: false,
                message: err,
                obj: null
            });
        }
        else{
            res.json({
                status: true,
                message: "Insert Successfully!",
                obj: user
            });
        }
    });
})

module.exports = router;