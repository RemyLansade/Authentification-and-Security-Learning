const express = require('express');
const router = express.Router();

const md5 = require('md5');

const User = require('../database/model/userSchema');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email: username}, (err, result) => {
        if(err) {
            res.sendStatus(500);
        } else {
            if(result){
                if(result.password === password){
                    res.render('secrets');
                } else {
                    res.send("Identifiant incorrect");
                }
            }
        }
    });
});

module.exports = router;