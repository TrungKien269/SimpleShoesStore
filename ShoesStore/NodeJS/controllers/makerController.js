const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Maker } = require('../models/makers');

router.get('/', (req, res) => {
    Maker.find((err, doc) => {
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
    Maker.findById(req.params.id).exec((err, doc) => {
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
                message: 'Can not find a maker with this id!',
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
    var maker = new Maker({
        name: req.body.name,
        description: req.body.description
    });
    Maker.collection.insertOne(maker, (err, doc) => {
        if(err){
            res.json(err);
        }
        else{
            res.json({message: "Insert Successfully!"});
        }
    })
});

module.exports = router;