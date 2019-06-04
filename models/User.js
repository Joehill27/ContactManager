const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactSchema = require('./Contact');

let UserSchema = new Schema({
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

module.exports = User = mongoose.model('user', UserSchema);