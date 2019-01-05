var mongoose = require('mongoose');

var Book = require('../schema/book');


function BookRepository() {
    mongoose.connect('mongodb://localhost:27017/taurus', { useNewUrlParser: true });
}

async function save(properties) {
    const book = new Book({
        // id: properties.id,
        title: properties.title,
        author: properties.author,
        price: properties.price,
        imageUrl: properties.imageUrl
    });
    await book.save();
    return book;
}

async function findAll() {
    var books = await Book.find({ 'status': { '$ne': 'DELETED' } }).exec();
    return books;
}

async function find(id) {
    var book = await Book.findOne({ _id: id }).exec();
    return book;
}

async function findBy(properties) {
    var book = await Book.findOne(properties).exec();
    return book;
}

async function remove(book) {
    await Book.findOneAndUpdate({ _id: book._id }, { status: 'DELETED' });
}

BookRepository.prototype.save = save;
BookRepository.prototype.findAll = findAll;
BookRepository.prototype.find = find;
BookRepository.prototype.findBy = findBy;
BookRepository.prototype.remove = remove;

module.exports = BookRepository;