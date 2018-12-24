// var mongoose = require('mongoose');

var Book = require('./../schema/book');


function BookRepository() {

}

function save(book) {

}

function findAll() {
    return [
        new Book({ id: '541', title: 'Evolutionary Architecture' }),
        new Book({ id: '542', title: 'Docker for Dummies' }),
    ];
}

BookRepository.prototype.save = save;
BookRepository.prototype.findAll = findAll;

module.exports = BookRepository;