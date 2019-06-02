const mongoose = require('mongoose');
const express = require('express');
var cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('morgan');
const ContactSchema = require('./contact.model');
const path = require('path');
const UserSchema = require('./user.model');

const User = mongoose.model('User', UserSchema);
const Contact = mongoose.model('Contact', ContactSchema);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://admin:admin@contactmanager-jabsx.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.route('/login/').get(function(req, res) {
    let name = req.body.username;
    User.findOne({username: name}).exec(function(err, user) {
    if(!user) {
        res.status(404).send("user does not exist");
    } else if(user.password === req.body.password) {
        res.status(200).send({'successful login': user});
    } else {
        res.status(400).send('unsuccessful login attempt');
    }
    });
});

router.route('/createAccount/').post(function(req, res) {
    let username = req.body.username;

    User.findOne({'username': username}).exec(function(err, user) {
        if(!user) {
            let newUser = new User(req.body);
            newUser.save()
            .then(newUser => {
                res.status(200).json({'user': 'New account created successfully' + newUser});
            })
        } else {
            res.status(404).send("Account with that username already exists");
        }
    });
});

router.route('/deleteAccount/:userId').delete(function(req, res) {
    let userId = req.params.usedId;

    User.findOneAndDelete({id: userId}, function(err, user) {
        if(!user) {
            res.status(404).send('user not found' + err);
        }
        else {
            res.status(200).send({'user deleted': user});
        }
    })
})

// Retrieves table of contacts for a specified userID
router.route('/:userId/getContacts/').get(function(req, res) {
    let userId = req.params.userId;
    User.find({'id': userId}).select('contacts').exec(function(err, contacts) {
        if(!contacts) {
            res.status(404).send("contacts not found");
        } else {
            res.json(contacts);
        }
    });
});

// Finds a specific contact from the table (userID) based on contactID
router.route('/:userId/getContact/:contactId').get(function(req, res) {
    let contactId = req.params.contactId;
    let userId = req.param.userId;
    User.find({'contacts._id': contactId}, {'contacts.$' : true}).exec(function(err, contact) {
        if(!contact){
            res.status(404).send("contact is not found");
        } else {
            res.status(200).send(contact);
        }
    });
});

// Adds a contact to the specified userID's table
router.route('/:userId/addContact/').post(function(req, res) {
    let userId = req.params.userId;
    var contact = {
        _id: mongoose.Types.ObjectId(),
        "contact_name": req.body.contact_name,
        "contact_email": req.body.contact_email,
        "contact_phone": req.body.contact_phone
    };

    User.update(
        { _id: userId }, 
        { $push: { contacts: contact }}
    ).exec(function(err) {
        if(err){
            res.status(404).send('Can not update contact');
        } else {
            res.status(200).send({'contact created successfully' : contact});
        }
    });
});

// Updates a specified contact in the userID's specified table
router.route('/:userId/updateContact/:contactId').put(function(req, res) {
    let contactId = req.params.contactId;
    let userId = req.params.userId;
    
    User.findById(userId, function(err, user){
        var contact = user.contacts.id(contactId);

        contact.set(req.body);

        user.save()
        .then(
            res.status(200).send({'Contact updated': contact})
        ).catch(function(err) {
            res.status(404).send('Unable to update contact');
        });
    });
});

//Deletes a specified contact
router.route('/:userId/deleteContact/:contactId').delete(function(req, res) {
    let contactId = req.params.contactId;
    let userId = req.params.userId;

    User.findById(userId, function(err, user) {
        if(err) {
            res.status(404).send('can not find user');
        }
        user.contacts.pull(contactId);
        user.save()
        .then(
            res.status(200).send('contact deleted')
        );
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));