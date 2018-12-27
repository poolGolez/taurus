var express = require('express');
var bodyParser = require('body-parser');
var {logger} = require('../server-utils');

var BookController = require('./controllers/book.controller');
var bookController = new BookController();

var app = express();
var router = express.Router();
app.use(logger);
app.use(bodyParser.json())

bookController.buildApi(router);
app.use(router);

app.listen(3000);
console.log('Server running at http://localhost');