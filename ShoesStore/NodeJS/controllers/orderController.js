const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Order } = require('../models/orders');
var { OrderDetail } = require('../models/order_details');

router.get('/:account_id', (req, res) => {
    Order.find({account_id: req.params.account_id})
    .populate({
        path: 'details',
        model: 'order_details',
        populate: {
            path: 'shoes_id',
            model: 'shoes',
        }
    })
    .exec((err, doc) => {
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
                message: 'Can not find orders with this account!',
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
    var order = new Order({
        account_id: req.body.account_id,
        datetime: req.body.datetime,
        total: req.body.total,
        details: req.body.details
    });
    Order.collection.insertOne(order, (err, doc) => {
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
                message: 'Success',
                obj: orderDetail
            });
        }
    })
});
module.exports = router;