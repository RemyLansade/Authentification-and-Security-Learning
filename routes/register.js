const express = require('express');
const router = express.Router();

const md5 = require('md5');

const User = require('../database/model/userSchema');


router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);

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