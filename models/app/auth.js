
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AuthSchema  = new Schema({
    username: String,
    token: String
});

module.exports = mongoose.model('Auth', AuthSchema);
