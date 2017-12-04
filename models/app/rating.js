
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RatingSchema  = new Schema({
    username: String,
    collection_name: String,
    rating_value: Number,
    collection_username: String
});

module.exports = mongoose.model('Rating', RatingSchema);
