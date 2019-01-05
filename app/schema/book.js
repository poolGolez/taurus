var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    'title': String,
    'author': String,
    'price': Number,
    'imageUrl': String,
    'status': {
        type: String,
        enum: [ 'AVAILABLE', 'DELETED' ],
        required: true,
        default: 'AVAILABLE'
    }
});

bookSchema.methods.isActive = function() {
    return this.status !== 'DELETED';
}


module.exports = mongoose.model('Book', bookSchema);