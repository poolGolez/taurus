var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    'id': 'string',
    'title': 'string',
    'status': {
        type: String,
        enum: [ 'AVAILABLE', 'DELETED' ],
        required: true,
        default: 'AVAILABLE'
    }
});


module.exports = mongoose.model('Book', bookSchema);