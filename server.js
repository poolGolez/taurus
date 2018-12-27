var express = require('express');
var bodyParser = require('body-parser');
var {logger} = require('./server-utils');

var BookController = require('./controllers/BookController');
var bookController = new BookController();

var app = express();
app.use(logger);
app.use(bodyParser.json())

bookController.buildApi(app);

app.listen(3000);
console.log('Server running at http://localhost');