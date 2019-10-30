const mongoose = require('mongoose');

var Maker = mongoose.model('makers', {
    name: { type: String },
    description: { type: String }
});

module.exports = { Maker };