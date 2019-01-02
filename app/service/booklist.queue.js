const curl = require('curl');
const Queue = require('better-queue');
const {JSDOM} = require('jsdom');
const jQuery = require('jquery');

const queueConfig = {
    afterProcessDelay: 2000
};

const actOnTask = function(task, callback) {
    console.log('working on task', task);

    curl.get(task.url, null, function(error, response, responseBody) {

        if(error) {
            console.error('Some error occured', error);
            callback(error, task);
        } else if(response.statusCode === 200) {
            console.log(`Retrieved HTML from ${task.url}`);
            const books = extractBooksFromHtml(responseBody);
            // save
            callback(null, books);
        } else {
            console.error('Some error occured', error);
            callback(`${response.statusCode} :${response.body}`);
        }
    });

    function extractBooksFromHtml(html) {
        const htmlDom = new JSDOM(html);
        const $ = jQuery(htmlDom.window);

        const $products = $('.product');
        const books = $.map($products, function(book) {
            const title = $(book).find('a.info').attr('title');
            const author = $(book).find('a.author-name').attr('title');
            const price = $(book).find('span.price').html().trim();
            const imageUrl = $(book).find('img').attr('src');

            return {
                title: title,
                author: author,
                price: parseFloat(price.substring(1)),
                imageUrl: imageUrl
            };
        });

        console.log(books);

    }

    callback(null, 'success');
}

module.exports = new Queue(actOnTask, queueConfig);