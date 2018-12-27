var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    'id': 'string',
    'title': 'string'
});


module.exports = mongoose.model('Book', bookSchema);