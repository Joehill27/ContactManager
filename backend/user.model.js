const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    email: {
        type: String
    },
    username : {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('Contact', Contact);