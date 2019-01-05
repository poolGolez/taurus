const {JSDOM} = require('jsdom');
const jQuery = require('jquery');

function BooklistHtmlParser(html) {
    this.htmlDom = new JSDOM(html);
}

BooklistHtmlParser.prototype.extractBooks = function() {
    const $ = jQuery(this.htmlDom.window);

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

    console.log('books', books);

    return books;
}

module.exports = BooklistHtmlParser;