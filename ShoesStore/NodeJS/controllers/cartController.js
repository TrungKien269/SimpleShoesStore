const express = require('express');
var router = express.Router();
var { Cart } = require('../models/carts');

router.get('/:account_id', (req, res) => {
    Cart.find({ account_id: req.params.account_id })
    .populate('shoes_id')
    .exec((err, data) => {
        if (err) {
            res.json({
                status: false,
                message: err,
                obj: null
            });
        }
        else if (!data) {
            res.json({
                status: false,
                message: "Can not find a cart matched with account!",
                obj: null
            });
        }
        else {
            res.json({
                status: true,
                message: "Success",
                obj: data
            });
        }
    });
});

router.post('/', (req, res) => {
    var cart = new Cart({
        account_id: req.body.account_id,
        shoes_id: req.body.shoes_id,
        quantity: parseInt(req.body.quantity)
    });
    Cart.collection.insertOne(cart, (err, doc) => {
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
                message: "Success",
                obj: cart
            });
        }
    })
});

router.put('/:account_id/:shoes_id', (req, res) => {
    Cart.findOne({
        account_id: req.params.account_id,
        shoes_id: req.params.shoes_id
    }).exec((err, data) => {
        if (err) {
            res.json({
                status: false,
                message: err,
                obj: null
            });
        }
        else if (!data) {
            res.json({
                status: false,
                message: "Can not find a cart matched with account!",
                obj: null
            });
        }
        else {
            var cart = data;
            cart.quantity = parseInt(req.body.quantity);
            cart.save((err, doc) => {
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
                        message: "Success",
                        obj: cart
                    });
                }
            });
        }
    });
});

router.delete('/:account_id/:shoes_id', (req, res) => {
    Cart.findOneAndRemove({
        account_id: req.params.account_id,
        shoes_id: req.params.shoes_id
    }).exec((err, doc) => {
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
                message: "Success",
                obj: 1
            });
        }
    });
});

router.delete('/all', (req, res) => {
    Cart.deleteOne({
        account_id: req.params.account_id
    }).exec((err, doc) => {
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
                message: "Success",
                obj: 1
            });
        }
    });
});

module.exports = router;
// Code tuần 1