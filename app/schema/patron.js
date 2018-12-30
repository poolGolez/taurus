const mongoose = require('mongoose');

const patronSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Patron', patronSchema);