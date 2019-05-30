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
    let username = req.param.username;
    User.findOne({username: new RegExp('^'+username+'$', "i")}, function(err, user) {
    if(!user) {
        res.status(404).send("User does not exist");
    } else {
        res.json(user);
    }
    });
});

router.route('/createaccount/').post(function(req, res) {
    let username = req.param.username;
    let email = req.param.email;
    let password = req.param.password;

    User.findOne({username: new RegExp('^'+username+'$', "i")}, function(err, user) {
        if(!user) {
            let newUser = new User(req.body);
            // newUser.username = username;
            // newUser.email = email;
            // newUser.password = password;
            newUser.save()
            .then(newUser => {
                releaseEvents.status(200).json({'user': 'New account created successfully'});
            })
        } else {
            res.status(404).send("Account with that username already exists");
        }
    });
});



// Retrieves table of contacts for a specified userID
router.route('/:userID/').get(function(req, res) {
  Contact.find(function(err, contacts) {
      if(err) {
          console.log(err)
      } else {
          res.json(contacts);
      }
  });
});

// Finds a specific contact from the table (userID) based on contactID
router.route('/:userID/:contactID').get(function(req, res) {
  let id = req.params.id;
  Contact.findById(id, function(err, contact) {
      res.json(contact);
  });
});

// Adds a contact to the specified userID's table
router.route('/:userID/add').post(function(req, res) {
  let contact = new Contact(req.body);
  contact.save()
      .then(contact => {
          releaseEvents.status(200).json({'contact': 'contact added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new contact failed');
      });
});

// Updates a specified contact in the userID's specified table
router.route('/:userID/update/:contactID').post(function(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
      if(!contact) {
          res.status(404).send("data is not found");
      } else {
          contact.contact_name = req.body.contact_name;
          contact.contact_phone = req.body.contact_phone;
          contact.contact_email = req.body.contact_email;

          contact.save().then(contact => {
              res.json('contact updated');
          })
          .catch(err => {
              res.status(400).send("update not possible");
          });
      }
  });
});


// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

