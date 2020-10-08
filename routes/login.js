const express = require('express');
const router = express.Router();

// const md5 = require('md5');
const bcrypt = require('bcrypt');

const User = require('../database/model/user.model');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username}, (err, user) => {
        if(!err) {
            if(user){
                bcrypt.compare(password, user.password, (error, result) => {
                    if(result){
                        res.render('secrets');
                    } else {
                        res.send("Identifiants incorrects")
                    }
                });
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(500);
        }
    });
});

module.exports = router;