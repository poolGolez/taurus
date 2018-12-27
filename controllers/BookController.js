var BookRepository = require('./../repository/BookRepository');

function BookController() {
    this.bookRepository = new BookRepository();
}

BookController.prototype.buildApi = function(app) {
    app.route('/books')
        .get(listBooks(this.bookRepository))
        .post(saveBook(this.bookRepository))
    ;


    function saveBook(repository) {
        return async function(request, response) {
            const bookProperties = request.body;
            var book = await repository.save(bookProperties);

            response.statusCode = 201;
            response.end(JSON.stringify(book));
        }
    }

    function listBooks(repository) {
        return async function (request, response) {
            var books =  await repository.findAll();
            response.set('Content-Type', 'application/json');
            response.end(JSON.stringify(books));
        };
    }

}

module.exports = BookController;
