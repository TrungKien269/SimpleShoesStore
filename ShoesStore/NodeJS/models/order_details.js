const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderDetail = mongoose.model('order_details', {
    // order_id: { type: Schema.Types.ObjectId, ref: 'orders' },
    shoes_id: { type: Schema.Types.ObjectId, ref: 'shoes' },
    quantity: { type: Number }
});

module.exports = { OrderDetail };