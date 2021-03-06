const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
    contact_name: {
        type: String
    },
    contact_phone: {
        type: String
    },
    contact_email: {
        type: String
    },
    approved : Boolean
});

module.exports = Contact;
