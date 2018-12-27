const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../app/server')
const Book = require('../app/schema/book');

chai.use(chaiHttp);

describe('Books API', function() {
    
    beforeEach(function(done) {
        Book.remove({}, function(error) {
            done();
        });
    });

    describe('GET /books', function() {

        it('should get all the books', function() {
            chai.request(server)
                .get('/book')
                .end(function(error, response) {
                    response.should.have.status(200);
                    done();
                }) 
        });

    });
});