var BookRepository = require('./../repository/BookRepository');

function BookController() {
    this.bookRepository = new BookRepository();
}

BookController.prototype.buildApi = function(app) {
    app.get('/book', listBooks(this.bookRepository));

    function listBooks(repository) {
        return function (request, response) {
            var books =  repository.findAll();
            response.set('Content-Type', 'application/json');
            response.end(JSON.stringify(books));
        };
    }

}

module.exports = BookController;
