const express = require('express');
const router = express.Router();

const User = require('../../models/User');


//Checks if a user exists by username, if they do checks password
router.post('/login', (req, res) => {
    let name = req.body.username;
    User.findOne({username: name}).exec(function(err, user) {
    if(!user) {
<<<<<<< HEAD
        res.status(404).json("user does not exist");
    } else {
        res.status(200).json({'user': user});
=======
        res.status(404).send("user does not exist");
    } else {
        res.status(200).send({'user': user});
>>>>>>> 8a19c7eb0a2bd197e2491e32ce203c08bae9f3f4
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
            res.status(400).send("Account with that username already exists");
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