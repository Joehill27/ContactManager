const mongoose = require('mongoose');
const express = require('express');
var cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('morgan');
const Contact = require('./contact.model');
const path = require('path');
const User = require('./user.model');

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const API_PORT = proces.env.port;
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
        res.status(404).send("User does not exist");
    } else {
        res.json(user);
    }
    });
});

router.route('/createaccount/').post(function(req, res) {
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



// Retrieves table of contacts for a specified userID
router.route('/getContacts/').get(function(req, res) {
    let username = req.body.username;
  Contact.find({'username': username}).exec(function(err, contacts) {
      if(err) {
          console.log(err)
      } else {
          res.json(contacts);
      }
  });
});

// Finds a specific contact from the table (userID) based on contactID
router.route('/getContact/').get(function(req, res) {
    let contact_name = req.body.contact_name;
  Contact.find({'contact_name': contact_name}).exec(function(err, contact) {
      res.json(contact);
  });
});

// Adds a contact to the specified userID's table
router.route('/addContact/').post(function(req, res) {
  let contact = new Contact(req.body);
  contact.save()
      .then(contact => {
          releaseEvents.status(200).json({'Contact added successfully': contact});
      })
      .catch(err => {
          res.status(400).send('Adding new contact failed');
      });
});

// Updates a specified contact in the userID's specified table
router.route('/editContact/').post(function(req, res) {
  Contact.findOne({'contact_name': contact_name}).exec(function(err, contact) {
      if(!contact) {
          res.status(404).send("contact is not found");
      } else {
          contact.contact_name = req.body.contact_name;
          contact.contact_phone = req.body.contact_phone;
          contact.contact_email = req.body.contact_email;

          contact.save().then(contact => {
              res.json('Contact updated');
          })
          .catch(err => {
              res.status(400).send("Can not update contact");
          });
      }
  });
});

//Deletes a specified contact
router.route('/removeContact/').delete(function(req, res) {
    let contact_name = req.body.contact_name
    Contact.findOneAndDelete({'contact_name': contact_name}).exec(function(err, contact){
        if(!contact){
            res.status(404).send("Contact is not found");
        } else{
            res.status(200).send({'Contact removed' : contact});
        }
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));