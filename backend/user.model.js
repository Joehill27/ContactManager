const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactSchema = require('./contact.model');

let User = new Schema({
    email: {
        type: String
    },
    username : {
        type: String
    },
    password: {
        type: String
    },
    contacts : [ContactSchema]
});

module.exports = mongoose.model('User', User);