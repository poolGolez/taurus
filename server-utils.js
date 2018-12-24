var moment = require('moment');

function logger(request, response, next) {
    console.log(moment().format(), '>>  ', request.method, request.url);
    next();
}

module.exports = {
    logger: logger
}