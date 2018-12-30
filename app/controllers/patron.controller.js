const PatronRepository = require('../repository/patron.repository');

function PatronController() {
    this.patronRepository = new PatronRepository();
}

PatronController.prototype.list = function() {
    repository = this.patronRepository;
    return async function(request, response, next) {
        var patrons = await repository.findAll();
        response.end(JSON.stringify(patrons));

        next();
    }
}

PatronController.prototype.fetchParameter = function() {
    repository = this.patronRepository;
    return async function(request, response, next) {
        var patron = await repository.find(id);

        if(patron) {
            request.patron = patron;
        } else {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end();
        }
        next();
    }
}

PatronController.prototype.show = function() {
    repository = this.patronRepository;
    return async function(request, response, next) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(request.patron));
        next();
    }
}

PatronController.prototype.save = function() {
    repository = this.patronRepository;
    return async function(request, response, next) {
        const properties = request.body;
        var patron = await repository.save(properties);

        response.statusCode = 201;
        response.setHeader('Content-type', 'application/json');
        response.end(JSON.stringify(patron));

        next();
    }
}


module.exports = PatronController;