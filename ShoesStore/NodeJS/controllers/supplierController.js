const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Supplier } = require('../models/suplliers');

router.get('/', (req, res) => {
    Supplier.find((err, doc) => {
        if(!err){
            res.json({
                status: true,
                message: "Success",
                obj: doc
            })
        }
        else{
            res.json({
                status: false,
                message: err,
                obj: null
            });
        }
    });
});

router.get('/:id', (req, res) => {
    Supplier.findById(req.params.id).exec((err, doc) => {
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
                message: 'Can not find a supplier with this id!',
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
    var supplier = new Supplier({
        name: req.body.name,
        mobile_number: req.body.mobile_number,
        address: req.body.address
    });
    Supplier.collection.insertOne(supplier, (err, doc) => {
        if(err){
            res.json(err);
        }
        else{
            res.json({message: "Insert Successfully!"});
        }
    })
});

module.exports = router;