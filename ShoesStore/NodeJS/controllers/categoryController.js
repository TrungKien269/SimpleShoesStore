const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Category } = require('../models/categories');

router.get('/', (req, res) => {
    Category.find((err, doc) => {
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
    Category.findById(req.params.id).exec((err, doc) => {
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
                message: 'Can not find a category with this id!',
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
    var category = new Category({
        name: req.body.name,
        description: req.body.description
    });
    Category.collection.insertOne(category, (err, doc) => {
        if(err){
            res.json(err);
        }
        else{
            res.json({message: "Insert Successfully!"});
        }
    })
});

module.exports = router;