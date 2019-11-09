const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = mongoose.model('orders', {
    account_id: { type: Schema.Types.ObjectId, ref: 'accounts' },
    datetime: { type: String },
    total: { type: Number },
    details: { type: [Schema.Types.ObjectId], ref: 'order_details' }
});

module.exports = { Order };