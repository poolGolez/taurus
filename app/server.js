var express = require('express');
var bodyParser = require('body-parser');
var {logger} = require('./server-utils');

var BookApi = require('./api/book.api');
var bookApi = new BookApi();

var PatronApi = require('./api/patron.api');
const patronApi = new PatronApi();

var app = express();
var router = express.Router();
app.use(logger);
app.use(bodyParser.json())

bookApi.addRoutes(router);
patronApi.addRoutes(router);
app.use(router);

app.listen(3000);
console.log('Server running at http://localhost');


const cr = require('./cron/test.cron');
cr.start();
module.exports = app;