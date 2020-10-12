const express = require('express');
const router = express.Router();

// const md5 = require('md5');
const bcrypt = require('bcrypt');

const User = require('../database/model/user.model');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    User.findOne({email: username}, (err, foundUser) => {
        if(!err) {
            if(foundUser){
                bcrypt.compare(password, foundUser.password, (error, result) => {
                    if (!error){
                        if(result){
                            res.render('secrets');
                        } else {
                            res.send("Identifiants incorrects")
                        }
                    } else {
                        console.error(error.message);
                        res.send(error.message);
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