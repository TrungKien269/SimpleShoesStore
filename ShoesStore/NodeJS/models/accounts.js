const mongoose = require('mongoose');

var Account = mongoose.model('accounts', {
    username: { type: String },
    password: { type: String },
    type: { type: Number },
    status: { type: Number }
});

module.exports = { Account };