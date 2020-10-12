const express = require('express');
const router = express.Router();

// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../database/model/user.model');


router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(!err){
            const newUser = new User({
                email: username,
                password: hash
            });
        
            newUser.save((err) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.render('secrets');
                }
            });
        } else {
            res.sendStatus(400);
        }
    });    
});

module.exports = router;