var connect = require('connect');


function log(request, response, next) {
    console.log(request.method, request.url);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end();
    next();
}
var app = connect()
    .use(log)
    .listen(3000);

console.log('Server running at http://localhost');