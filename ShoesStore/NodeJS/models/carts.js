const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart = mongoose.model('carts', {
    account_id: { type: Schema.Types.ObjectId, ref: 'accounts' },
    shoes_id: { type: Schema.Types.ObjectId, ref: 'shoes' },
    quantity: { type: Number }
});

module.exports = { Cart };