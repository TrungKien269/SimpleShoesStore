const mongoose = require('mongoose');

var Supplier = mongoose.model('suppliers', {
    name: { type: String },
    mobile_number: { type: String },
    address: { type: String }
});

module.exports = { Supplier };