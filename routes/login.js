const express = require('express');
const router = express.Router();

const User = require('../database/model/userSchema');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const {username, password} = req.body;

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