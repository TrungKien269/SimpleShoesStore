const express = require('express');
var router = express.Router();
var { Shoes } = require('../models/shoes');

router.get('/', (req, res) => {
    Shoes.find((err, doc) => {
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
    Shoes.findById(req.params.id)
    .populate('maker_id').populate('category_id').populate('origin_id')
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
                message: 'Can not find a shoes with this id!',
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
    var shoes = new Shoes({
        name: req.body.name,
        designer: req.body.designer,
        maker_id: req.body.maker_id,
        category_id: req.body.category_id,
        origin_id: req.body.origin_id,
        shoes_sizes: req.body.shoes_sizes,
        shoes_colors: req.body.shoes_colors,
        release_date: req.body.release_date,
        status: 1
    });
    console.log(shoes);
    Shoes.collection.insertOne(shoes, (err, doc) => {
        if(err){
            res.json(err);
        }
        else{
            res.json({message: "Insert Successfully!"});
        }
    })
});

module.exports = router;
// Code tuần 1