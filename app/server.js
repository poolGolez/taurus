var express = require('express');
var bodyParser = require('body-parser');
var {logger} = require('../server-utils');

var BookController = require('./controllers/book.controller');
var bookController = new BookController();

var BookApi = require('./api/book.api.js');
var bookApi = new BookApi();

var app = express();
var router = express.Router();
app.use(logger);
app.use(bodyParser.json())

// bookController.buildApi(router);
bookApi.addRoutes(router);
app.use(router);

app.listen(3000);
console.log('Server running at http://localhost');