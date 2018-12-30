let BookController = require('./../controllers/book.controller.js');

function BookApi() {
    this.controller = new BookController();
}

BookApi.prototype.addRoutes = function(router) {
    router.route('/api/v1/books')
        .post(this.controller.save())
        .get(this.controller.list())
    ;

    router
        .param('bookId', this.controller.fetchParameter())
        .route('/api/v1/books/:bookId')
            .get(this.controller.show())
            .delete(this.controller.delete())
    ;
}

module.exports = BookApi;