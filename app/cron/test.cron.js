const cron = require('node-cron');
const curl = require('curl');
const {JSDOM} = require('jsdom');
const jQuery = require('jquery');

const queue = require('../service/booklist.queue.js');

const config = { scheduled: true }

const job = cron.schedule('* * * * *', function() {
    console.log('running from cron job');
    const url = 'https://www.fullybookedonline.com/t/categories/books';

    curl.get(url, null, function(error, response, responseBody) {

        if(error || response.statusCode !== 200) {
            console.error('Some error occured', error);
        } else {
            console.log(`Retrieved HTML from ${task.url}`);
            const lastPage = extractLastPage(responseBody);

            for(let page = 1; page <= lastPage; page++) {
                queue.push({
                    url: `${url}?page=${page}`
                })
            }
        }
    });

    function extractLastPage(html) {
        const htmlDom = new JSDOM(html);
        const $ = jQuery(htmlDom.window);

        const lastPage = $('.last a').attr('href').split('?page=')[1];
        return lastPage;
    }
}, config);

module.exports = job;