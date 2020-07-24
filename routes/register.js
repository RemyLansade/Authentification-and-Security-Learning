const express = require('express');
const router = express.Router();

const User = require('../database/model/userSchema');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const {username, password} = req.body;

    const newUser = new User({
        email: username,
        password: password
    });

    newUser.save((err) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.render('secrets');
        }
    });
    
});

module.exports = router;