const mongoose = require('mongoose');

var Category = mongoose.model('categories', {
    name: { type: String },
    description: { type: String }
});

module.exports = { Category };