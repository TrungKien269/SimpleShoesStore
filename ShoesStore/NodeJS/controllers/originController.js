const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Origin } = require('../models/origins');

router.get('/', (req, res) => {
    Origin.find((err, doc) => {
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
    Origin.findById(req.params.id).exec((err, doc) => {
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
                message: 'Can not find a origin with this id!',
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
    var origin = new Origin({
        country_name: req.body.name
    });
    Origin.collection.insertOne(origin, (err, doc) => {
        if(err){
            res.json(err);
        }
        else{
            res.json({message: "Insert Successfully!"});
        }
    })
});

module.exports = router;