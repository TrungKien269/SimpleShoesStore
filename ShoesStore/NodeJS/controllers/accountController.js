const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var router = express.Router();
var { Account } = require('../models/accounts');
var md5 = require('md5');

router.get('/', (req, res) => {
    Account.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            res.json({
                status: false,
                message: "Error in retriving Account: " +
                    JSON.stringify(err, undefined, 2)
            })
        }
    });
});

router.post('/social/facebook', (req, res) => {
    Account.findOne({ facebook_id: req.body.facebook_id }).exec((err, doc) => {
        if (err) {
            res.json({
                status: false,
                message: "Error in retriving Account: " +
                    JSON.stringify(err, undefined, 2)
            });
        }
        else if (!doc) {
            res.json({
                status: false,
                message: "Wrong facebook account!"
            });
        }
        else {
            var account = doc;
            // res.json({
            //     status: true,
            //     message: "Success",
            //     obj: account
            // });
            let payload = { subject: account._id };
            let token = jwt.sign(payload, 'secretKey');
            var obj = {
                data: account,
                token: token
            }
            res.json({
                status: true,
                message: "Success",
                obj: obj
            });
        }
    });
});

router.post('/social/google', (req, res) => {
    Account.findOne({ google_id: req.body.google_id }).exec((err, doc) => {
        if (err) {
            res.json({
                status: false,
                message: "Error in retriving Account: " +
                    JSON.stringify(err, undefined, 2)
            });
        }
        else if (!doc) {
            res.json({
                status: false,
                message: "Wrong google account!"
            });
        }
        else {
            var account = doc;
            // res.json({
            //     status: true,
            //     message: "Success",
            //     obj: account
            // });
            let payload = { subject: account._id };
            let token = jwt.sign(payload, 'secretKey');
            var obj = {
                data: account,
                token: token
            }
            res.json({
                status: true,
                message: "Success",
                obj: obj
            });
        }
    });
});

router.post('/login', (req, res) => {
    var hash = md5(req.body.password);
    Account.findOne({ username: req.body.username }).exec((err, doc) => {
        if (err) {
            res.json({
                status: false,
                message: "Error in retriving Account: " +
                    JSON.stringify(err, undefined, 2)
            });
        }
        else if (!doc) {
            res.json({
                status: false,
                message: "Wrong username or password!"
            });
        }
        else {
            var account = doc;
            if (account.password != hash) {
                res.json({
                    status: false,
                    message: "Wrong username or password!"
                });
            }
            else {
                let payload = { subject: account._id };
                let token = jwt.sign(payload, 'secretKey');
                var obj = {
                    data: account,
                    token: token
                }
                res.json({
                    status: true,
                    message: "Success",
                    obj: obj
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
        facebook_id: req.body.facebook_id,
        google_id: req.body.google_id,
        type: parseInt(req.body.type),
        status: 1
    });
    Account.collection.insertOne(account, (err, data) => {
        if (err) {
            res.json({
                status: false,
                message: err,
                obj: null
            });
        }
        else {
            res.json({
                status: true,
                message: "Insert Successfully!",
                obj: account
            });
        }
    })
});

router.get('/special', cors(), verifyToken, (req, res) => {
    res.json({
        status: true,
        message: "Success",
        obj: null
    });
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.json({
            status: false,
            message: "Unauthorized Request!",
            obj: null
        });
    }
    try {
        let token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.json({
                status: false,
                message: "Unauthorized Request!",
                obj: null
            });
        }
        if (token === 'null') {
            res.json({
                status: false,
                message: "Unauthorized Request!",
                obj: null
            });
        }
        let payload = jwt.verify(token, 'secretKey');
        if (!payload) {
            res.json({
                status: false,
                message: "Unauthorized Request!",
                obj: null
            });
        }
        req.userID = payload.subject;
        next();
    }
    catch (e) {
        res.json({
            status: false,
            message: "Unauthorized Request!",
            obj: null
        });
    }
}

module.exports = router;
// Code tuần 1