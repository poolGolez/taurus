var BookRepository = require('./../repository/BookRepository');

function BookController() {
    this.bookRepository = new BookRepository();
}

BookController.prototype.buildApi = function(router) {
    router.route('/books')
        .get(listBooks(this.bookRepository))
        .post(saveBook(this.bookRepository))
    ;

    router
        .param('bookId', (function(repository) {
            return async function(req, res, next, bookId) {
                var book = await repository.find(bookId);
                if(book && book.isActive()) {
                    req.book = book;
                    next();
                } else {
                    next(new Error('Book not found'));
                }
            }
        })(this.bookRepository))
        .route('/books/:bookId')
        .get(showBook())
        .delete(deleteBook(this.bookRepository))
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

    function showBook() {
        return async function(request, response, next) {
            response.end(JSON.stringify(request.book));
        }
    }

    function deleteBook(repository) {
        return async function(request, response) {
            repository.remove(request.book);

            response.writeHead(204, { 'Content-type' : 'application/json' });
            response.end();
        }
    }

}

module.exports = BookController;
