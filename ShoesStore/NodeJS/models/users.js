const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = mongoose.model('users', {
    fullname: { type: String },
    gender: { type: String },
    mobile_number: { type: String },
    address: { type: String },
    account_id: { type: Schema.Types.ObjectId, ref: 'accounts' }
});

module.exports = { User };