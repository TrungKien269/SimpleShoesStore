const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Color } = require('../models/colors');

router.get('/', (req, res) => {
    Color.find((err, doc) => {
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
    Color.findById(req.params.id).exec((err, doc) => {
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
                message: 'Can not find a color with this id!',
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