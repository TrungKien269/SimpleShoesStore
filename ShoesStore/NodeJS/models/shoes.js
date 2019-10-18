const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Shoes = mongoose.model('shoes', {
    name: { type: String },
    designer: { type: String },
    maker_id: { type: Schema.Types.ObjectId, ref: 'makers' },
    category_id: { type: Schema.Types.ObjectId, ref: 'categories' },
    origin_id: { type: Schema.Types.ObjectId, ref: 'origins' },
    shoes_sizes: [{ type: Number, ref: 'sizes' }],
    shoes_colors: [{ type: Schema.Types.ObjectId, ref: 'colors' }],
    shoes_prices: [{ type: Number }],
    release_date: { type: String },
    status: { type: Number }
});

module.exports = { Shoes };
// Code tuần 1