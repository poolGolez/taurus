var mongoose = require('mongoose');

var Book = require('./../schema/book');


function BookRepository() {

}

async function save(properties) {
    try {
        mongoose.connect('mongodb://localhost:27017/taurus');
        var db = mongoose.connection;
        const book = new Book({
            id: properties.id,
            title: properties.title
        });
        console.log(properties);
        await book.save();
        db.close();
        return book;
    } catch(err) {
        throw err;
    }
}

async function findAll() {
    try {
        mongoose.connect('mongodb://localhost:27017/taurus');
        var db = mongoose.connection;

        var books = await Book.find({}).exec();
        db.close();

        return books;
    } catch(err) {
        throw err;
    }
}

BookRepository.prototype.save = save;
BookRepository.prototype.findAll = findAll;

module.exports = BookRepository;