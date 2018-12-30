const mongoose = require('mongoose');

const Patron = require('../schema/patron');

function PatronRepository() {
    mongoose.connect('mongodb://localhost:27017/taurus',
        { useNewUrlParser : true });
}

PatronRepository.prototype.findAll = async function() {
    const patrons = await Patron.find({}).exec();
    return patrons;
}

PatronRepository.prototype.find = async function(id) {
    const patron = await Patron.findById(id);
    return patron;
}

PatronRepository.prototype.save = async function(properties) {
    const patron = new Patron({
        name: properties.name
    });
    await patron.save();
    return patron;
}

module.exports = PatronRepository;