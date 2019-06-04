const express = require('express');
const router = express.Router();

const User = require('../../models/User');


//Checks if a user exists by username, if they do checks password
router.post('/login', (req, res) => {
    let name = req.body.username;
    User.findOne({username: name}).exec(function(err, user) {
    if(!user) {
        res.status(404).send("user does not exist");
    } else if(user.password === req.body.password) {
        res.status(200).send({'successful login': user});
    } else {
        res.status(400).send('incorrect username or password');
    }
    });
});

//Creates an account with given info
router.post('/createAccount', (req, res) => {
    let username = req.body.username;

    User.findOne({'username': username}).exec(function(err, user) {
        if(!user) {
            let newUser = new User(req.body);
            newUser.save()
            .then(newUser => {
                res.status(200).json({'user': newUser});
            })
        } else {
            res.status(404).send("Account with that username already exists");
        }
    });
});

//Deletes a user by id
router.delete('/deleteAccount/:userId', (req, res) => {
    let userId = req.params.usedId;

    User.findOneAndDelete({id: userId}, function(err, user) {
        if(!user) {
            res.status(404).send('user not found' + err);
        }
        else {
            res.status(200).send({'user': user});
        }
    })
});

module.exports = router;