var BookRepository = require('../repository/book.repository');

function BookController() {
    this.bookRepository = new BookRepository();
}

BookController.prototype.save = function() {
    repository = this.bookRepository;
    return async function(request, response, next) {
        const bookProperties = request.body;
        var book = await repository.save(bookProperties);

        response.statusCode = 201;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(book));
        next();
    }
}

BookController.prototype.list = function() {
    repository = this.bookRepository;
    return async function (request, response, next) {
        var books =  await repository.findAll();

        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(books));
        next();
    };
}

BookController.prototype.fetchParameter = function() {
    repository = this.bookRepository;
    return async function(request, response, next, id) {
        var book = await repository.find(id);

        if(book && book.isActive()) {
            request.book = book;
            next();
        } else {
            let error = new Error("Book not found");
            response.writeHead(404, {'Content-Type': 'application/json'});
            response.end();
        }
    }
}

BookController.prototype.show = function() {
    return async function(request, response, next) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(request.book));
        next();
    }
}

BookController.prototype.delete = function() {
    return async function(request, response, next) {
        await repository.remove(request.book)

        response.writeHead(204, {'Content-type': 'applicaiton/json'});
        response.end();
        next();
    }
}


module.exports = BookController;
