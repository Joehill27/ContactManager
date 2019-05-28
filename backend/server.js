const mongoose = require('mongoose');
const express = require('express');
var cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

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

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// Retrieves table of contacts for a specified userID
Router.route('/:userID/').get(function(req, res) {
  Contact.find(function(err, contacts) {
      if(err) {
          console.log(err)
      } else {
          res.json(contacts);
      }
  });
});

// Finds a specific contact from the table (userID) based on contactID
Router.route('/:userID/:contactID').get(function(req, res) {
  let id = req.params.id;
  Contact.findById(id, function(err, contact) {
      res.json(contact);
  });
});

// Adds a contact to the specified userID's table
Router.route('/:userID/add').post(function(req, res) {
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
Router.route('/:userID/update/:contactID').post(function(req, res) {
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

