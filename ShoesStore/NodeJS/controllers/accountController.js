const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var router = express.Router();
var { Account } = require('../models/accounts');
const md5 = require('md5');

const expiredToken = '1h';

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
            let payload = { subject: account._id };
            let token = jwt.sign(payload, 'secretKey', {
                expiresIn: expiredToken
            });
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
            let payload = { subject: account._id };
            let token = jwt.sign(payload, 'secretKey', {
                expiresIn: expiredToken
            });
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
                let token = jwt.sign(payload, 'secretKey', {
                    expiresIn: expiredToken
                });
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
            let payload = { subject: account._id };
            let token = jwt.sign(payload, 'secretKey', {
                expiresIn: expiredToken
            });
            var obj = {
                data: account,
                token: token
            }
            var obj = {
                data: account,
                token: token
            }
            res.json({
                status: true,
                message: "Insert Successfully!",
                obj: obj
            });
        }
    })
});

router.get('/special', cors(), verifyToken, (req, res) => {
    res.send({
        status: true,
        message: "Success",
        obj: null
    });
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.send({
            status: false,
            message: "Unauthorized Request!",
            obj: null
        });
    }
    else {
        try {
            let token = req.headers.authorization.split(' ')[1];
            let decoded = jwt.decode(token, 'secretKey');
            if (decoded.exp <= Date.now().toString()
            .substring(0, parseInt(decoded.exp.toString().length))) {
                res.send({
                    status: false,
                    message: "Access token has expired, you have to re-login!",
                    obj: null
                });
            }
            else if (!token) {
                res.send({
                    status: false,
                    message: "Unauthorized Request!",
                    obj: null
                });
            }
            else if (token === 'null') {
                res.send({
                    status: false,
                    message: "Unauthorized Request!",
                    obj: null
                });
            }
            else {
                let payload = jwt.verify(token, 'secretKey');
                if (!payload) {
                    res.send({
                        status: false,
                        message: "Unauthorized Request!",
                        obj: null
                    });
                }
                else {
                    req.userID = payload.subject;
                    next();
                }
            }
        }
        catch (e) {
            res.send({
                status: false,
                message: "Unauthorized Request!",
                obj: null
            });
        }
    }
}

module.exports = router;
// Code tuần 1