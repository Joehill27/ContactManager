const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/user');
const contacts = require('./routes/api/contact');

const app = express();
app.use(bodyParser.json());

const dbURI = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(dbURI, {useNewUrlParser: true})
    .then(() => console.log('MonoDB Connected...'))
    .catch(err => console.log(err));

//Routes
app.use('/api/user', users);
app.use('/api/contact', contacts);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));