
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhotoCollectionSchema  = new Schema({
    username: String,
    description: String,
    name: String,
    numberOfRatings: Number,
    sumOfRatings: Number,
    public: Boolean,
    photos: []
});

module.exports = mongoose.model('PhotoCollection', PhotoCollectionSchema);
