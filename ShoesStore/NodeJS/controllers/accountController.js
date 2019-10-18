const express = require('express');
var router = express.Router();
var { Account } = require('../models/accounts');
var md5 = require('md5');

router.get('/', (req, res) => {
    Account.find((err, docs) => {
        if(!err){
            res.send(docs);
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

router.post('/login', (req, res) => {
    var hash = md5(req.body.password);
    Account.findOne({username: req.body.username}).exec((err, doc) => {
        if(err){
            res.json({
                status: false,
                message: "Error in retriving Account: " + 
                JSON.stringify(err, undefined, 2)
            });
        }
        else if(!doc){
            res.json({
                status: false,
                message: "Wrong username or password!"
            });
        }
        else{
            var account = doc;
            if(account.password != hash){
                res.json({
                status: false,
                message: "Wrong username or password!"
                });
            }
            else{
                res.json({
                    status: true,
                    message: "Success",
                    obj: account
                });
            }
        }
    });
})

router.post('/', (req, res) => {
    var hash = md5(req.body.password);
    var account = new Account({
        username: req.body.username,
        password: md5(req.body.password),
        type: parseInt(req.body.type),
        status: 1
    });
    Account.collection.insertOne(account, (err, data) => {
        if(err){
            res.json(err);
        }
        else{
            res.json({message: "Insert Successfully!"});
        }
    })
});

module.exports = router;
// Code tuần 1