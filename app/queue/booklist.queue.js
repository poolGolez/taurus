const curl = require('curl');
const Queue = require('better-queue');
const BooklistHtmlParser = require('../service/booklist-parser');

const queueConfig = {
    afterProcessDelay: 5000
};

const actOnTask = function(task, callback) {
    console.log('working on task', task);

    curl.get(task.url, null, function(error, response, responseBody) {

        if(error) {
            console.error('Some error occured', error);
            callback(error, task);
        } else if(response.statusCode === 200) {
            console.log(`Retrieved HTML from ${task.url}`);
            const parser = new BooklistHtmlParser(responseBody);
            const books = parser.extractBooks();
            console.log(books);
            // save
            callback(null, books);
        } else {
            console.error('Some error occured', error);
            callback(`${response.statusCode} :${response.body}`);
        }
    });
}

module.exports = new Queue(actOnTask, queueConfig);
