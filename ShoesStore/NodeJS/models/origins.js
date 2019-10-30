const mongoose = require('mongoose');

var Origin = mongoose.model('origins', {
    country_name: { type: String }
});

module.exports = { Origin };