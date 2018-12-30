const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../app/server')
const Patron = require('../app/schema/patron');

chai.use(chaiHttp);


describe('Patron API', function() {

    beforeEach(function(done) {
        Patron.deleteMany({}, function(_) {
            done();
        });
    });

    describe('GET /api/v1/patrons', function() {

        it('should return empty array if there are no patrons', function(done) {
            chai.request(server)
                .get('/api/v1/patrons')
                .end(function(_, response) {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eql(0);

                    done();
                })
        });

        it('should return all the patrons from the database', function(done) {
            const patron1 = new Patron({ 'name': 'John Doe' });
            const patron2 = new Patron({ 'name': 'Jane Doe' });

            patron1.save(function() {
                patron2.save(function() {
                    chai.request(server)
                        .get('/api/v1/patrons')
                        .end(function(_, response) {
                            response.should.have.status(200);
                            response.body.length.should.be.eql(2);

                            done();
                        });
                });
            });
        });

    });

    describe('GET /api/v1/patrons/:patronId', function() {

        it('should return HTTP NOT FOUND status if the patron does not exist', function(done) {
            chai.request(server)
                .get('/api/v1/patrons/5c28ce58e1c7f446fdb873b2')
                .end(function(_, response) {
                    response.should.have.status(404);

                    done();
                });
        });

        it('should return the patron matching the given ID', function(done) {
            const patron = new Patron({ name: 'Quazimodo Loathl' });
            patron.save(function(_, patron) {
                chai.request(server)
                    .get(`/api/v1/patrons/${patron._id}`)
                    .end(function(_, response) {
                        response.should.have.status(200);
                        response.body.should.have.property('name').eql(patron.name);

                        done();
                    })
            });
        });

    });

    describe('POST /api/v1/patrons', function() {

        it('should save a new patron to the databse', function(done) {
            const patron = new Patron({ name: 'Star Boxx' });
            chai.request(server)
                .post('/api/v1/patrons')
                .send(patron)
                .end(function(_, response) {
                    response.should.have.status(201);
                    response.body.should.have.property('name').eql(patron.name);

                    Patron.find({ name: patron.name }, function(_, patronDb) {
                        patronDb.should.be.not.null;
                        done();
                    })
                });
        })

    })

});
