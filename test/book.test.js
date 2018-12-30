const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../app/server')
const Book = require('../app/schema/book');

chai.use(chaiHttp);

describe('Books API', function() {
    
    beforeEach(function(done) {
        Book.deleteMany({}, function(error) {
            done();
        });
    });

    describe('GET /api/v1/books', function() {

        it('should return empty array if there are no books', function(done) {
            chai.request(server)
                .get('/api/v1/books')
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eql(0);
                    done();
                });
        });

        it('should return all books from the database', function(done) {
            const book1 = new Book({ id: '334RT', title: 'Design of Everyday Things' });
            const book2 = new Book({ id: 'GXCS9', title: 'Zero to One' });

            book1.save(function() {
                book2.save(function() {
                    chai.request(server)
                        .get('/api/v1/books')
                        .end(function(_, response) {
                            response.should.have.status(200);
                            response.body.length.should.be.eql(2);
                            done();
                        });
                });
            });
        });

        it('should NOT include DELETED books from the database', function(done) {
            const book1 = new Book({ id: '334RT', title: 'Design of Everyday Things', status: 'DELETED' });
            const book2 = new Book({ id: 'GXCS9', title: 'Zero to One' });

            book1.save(function() {
                book2.save(function() {
                    chai.request(server)
                        .get('/api/v1/books')
                        .end(function(_, response) {
                            response.should.have.status(200);
                            response.body.length.should.be.eql(1);

                            response.body[0].should.have.property('id').eql(book2.id);
                            done();
                        });
                });
            });
        });

    });

    describe('GET /api/v1/books/:bookId', function() {

        it('should return HTTP NOT FOUND status if the book does not exist', function(done) {
            chai.request(server)
                .get('/api/v1/books/5c287e020e15c61949e6b138')
                .end(function(_, response) {
                    response.should.have.status(404);
                    done();
                });
        });

        it('should return HTTP NOT FOUND status if the book has DELETED status', function(done) {
            chai.request(server)
                .get('/api/v1/books/5c287e020e15c61949e6b138')
                .end(function(_, response) {
                    const book = new Book({id: '7EE3P', title: 'The Little Book of Semaphores', 'status': 'DELETED'});
                    
                    response.should.have.status(404);
                    done();
                });
        });

        it('should return the book matching the given ID', function(done) {
            const book = new Book({id: '7EE3P', title: 'The Little Book of Semaphores', 'status': 'AVAILABLE'});
            book.save(function(_, book) {
                chai.request(server)
                    .get(`/api/v1/books/${book._id}`)
                    .end(function(_, response) {
                        response.should.have.status(200);
                        response.body.should.have.property('id').eql(book.id);
                        response.body.should.have.property('title').eql(book.title);
                        response.body.should.have.property('status').eql(book.status);
                        done();
                    });
            });
        })

    })

    describe('POST /api/v1/books', function() {

        it('should save a new book to the database', function(done) {
            const bookRequest = new Book({ id: 'TT45H', title: 'Cellular Automata'});
            chai.request(server)
                .post('/api/v1/books')
                .send(bookRequest)
                .end(function(_, response) {
                    response.should.have.status(201);

                    response.body.should.have.property('id').eql(bookRequest.id);
                    response.body.should.have.property('title').eql(bookRequest.title);
                    response.body.should.have.property('status').eql('AVAILABLE');

                    Book.findOne({ id: bookRequest.id }, function(_, book) {
                        book.should.not.be.null;
                        done();
                    });
                });
        });

    });

    describe('DELETE /api/v1/books/:bookId', function() {

        it('should mark the specified book as DELETED', function(done) {
            const book = new Book({ id: 'GB3BN', title: 'Clean Code' });
            book.save(function(_, book) {
                chai.request(server)
                    .delete(`/api/v1/books/${book._id}`)
                    .end(function(_, response) {
                        response.should.have.status(204);

                        Book.findOne({ id: book.id }, function(_, bookDb) {
                            bookDb.should.not.be.null;
                            bookDb.should.have.property('id').eql(book.id);
                            bookDb.should.have.property('title').eql(book.title);
                            bookDb.should.have.property('status').eql('DELETED');
                            done();
                        });
                    });
            });
        });

    })
});