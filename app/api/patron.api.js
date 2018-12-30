const PatronController = require('../controllers/patron.controller');

function PatronApi() {
    this.controller = new PatronController();
}

PatronApi.prototype.addRoutes = function (router) {
    router.route('/api/v1/patrons')
        .post(this.controller.save())
        .get(this.controller.list())
    ;

    router
        .param('patronId', this.controller.fetchParameter())
        .route('/api/v1/patrons/:patronId')
            // .get(this.controller.show())
    ;
}

module.exports = PatronApi;