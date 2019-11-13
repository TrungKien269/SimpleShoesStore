const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Color = mongoose.model('colors', {
    name: { type: String }
});

module.exports = { Color };