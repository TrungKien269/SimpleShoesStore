const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Size = mongoose.model('sizes', {
    _id: { type: Number },
    us_size: { type: Number },
    uk_size: { type: Number }
});

module.exports = { Size };