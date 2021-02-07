const express  = require('express');
const passport = require('passport');
const router   = express.Router();

const User     = require('../database/model/user.model');


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.logIn(user, (err) => {
        if(err){
            console.log(err);
            res.sendStatus(500);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secrets');
            });
        }
    });
});

module.exports = router;