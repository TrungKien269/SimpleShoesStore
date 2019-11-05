const mongoose = require('mongoose');

var Account = mongoose.model('accounts', {
    username: { type: String },
    password: { type: String },
    facebook_id: { type: String },
    google_id: { type: String },
    type: { type: Number },
    status: { type: Number }
});

module.exports = { Account };
// Code tuần 1