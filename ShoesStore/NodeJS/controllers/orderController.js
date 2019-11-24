const express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var ObjectId = require('mongoose').Types.ObjectId;
var { Order } = require('../models/orders');
var { OrderDetail } = require('../models/order_details');

router.get('/:account_id', (req, res) => {
    Order.find({ account_id: req.params.account_id })
        .populate({
            path: 'details',
            model: 'order_details',
            populate: {
                path: 'shoes_id',
                model: 'shoes',
            }
        })
        .exec((err, doc) => {
            if (err) {
                res.json({
                    status: false,
                    message: err,
                    obj: null
                });
            }
            else if (!doc) {
                res.json({
                    status: false,
                    message: 'Can not find orders with this account!',
                    obj: null
                });
            }
            else {
                res.json({
                    status: true,
                    message: 'Success',
                    obj: doc
                });
            }
        });
});

router.get('/single/:id', (req, res) => {
    Order.findById(req.params.id)
        .populate({
            path: 'details',
            model: 'order_details',
            populate: {
                path: 'shoes_id',
                model: 'shoes',
            }
        })
        .exec((err, doc) => {
            if (err) {
                res.json({
                    status: false,
                    message: err,
                    obj: null
                });
            }
            else if (!doc) {
                res.json({
                    status: false,
                    message: 'Can not find orders with this id!',
                    obj: null
                });
            }
            else {
                res.json({
                    status: true,
                    message: 'Success',
                    obj: doc
                });
            }
        });
});

router.post('/', (req, res) => {
    var order = new Order({
        account_id: req.body.account_id,
        datetime: req.body.datetime,
        total: req.body.total,
        details: req.body.details
    });
    Order.collection.insertOne(order, (err, doc) => {
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
                message: 'Success',
                obj: order
            });
        }
    });
});

router.post('/details', (req, res) => {
    var orderDetail = new OrderDetail({
        _id: req.body._id,
        shoes_id: req.body.shoes_id,
        quantity: req.body.quantity,
        // order_id: req.body.order_id
    });
    OrderDetail.collection.insertOne(orderDetail, (err, doc) => {
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
                message: 'Success',
                obj: orderDetail
            });
        }
    })
});

router.post('/sendMail', (req, res) => {
    var request = require('request');
    request('http://localhost:3000/orders/single/' + req.body.orderID, 
    function (error, response, body) {
        var result = JSON.parse(body);
        var mailContent = "Order Code: " + result.obj._id + '\n\n';
        mailContent += "List items" + '\n';
        for(var i = 0; i < result.obj.details.length; i++){
            mailContent += result.obj.details[i].shoes_id.name + '\t\t';
            mailContent += result.obj.details[i].shoes_id.shoes_prices[1] + "$" + '\n';
        }
        mailContent += '\n';
        mailContent += "Total: " + result.obj.total + "$";

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pokemon.ute19.06@gmail.com',
                pass: 'Pokemon@123'
            }
        });
        var mailOptions = {
            from: 'pokemon.ute19.06@gmail.com',
            to: req.body.email,
            subject: 'Order notification',
            text: mailContent
        };
        transporter.sendMail(mailOptions, function (err, doc) {
            if (err) {
                res.json({
                    status: false,
                    message: err,
                    obj: null
                });
            } else {
                res.json({
                    status: true,
                    message: 'Success',
                    obj: doc
                });
            }
        });
    });
});

module.exports = router;