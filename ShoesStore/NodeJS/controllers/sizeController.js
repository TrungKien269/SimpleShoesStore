const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Size } = require('../models/sizes');

router.get('/', (req, res) => {
    Size.find((err, doc) => {
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
    Color.findById(parseInt(req.params.id)).exec((err, doc) => {
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
                message: 'Can not find size with this id!',
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
module.exports = router;