var mongoose = require('mongoose');

var Book = require('../schema/book');


function BookRepository() {
    mongoose.connect('mongodb://localhost:27017/taurus', { useNewUrlParser: true });    
}

async function save(properties) {
    const book = new Book({
        id: properties.id,
        title: properties.title
    });
    await book.save();
    return book;
}

async function findAll() {
    try {
        var books = await Book.find({ 'status': { '$ne': 'DELETED' } }).exec();
        return books;
    } catch(err) {
        throw err;
    }
}

async function find(id) {
    var book = await Book.findOne({ _id: id }).exec();
    return book;
}

async function remove(book) {
    try {
        await Book.findOneAndUpdate({ _id: book._id }, { status: 'DELETED' });
    } catch(err) {
        throw err;
    }
}

BookRepository.prototype.save = save;
BookRepository.prototype.findAll = findAll;
BookRepository.prototype.find = find;
BookRepository.prototype.remove = remove;

module.exports = BookRepository;