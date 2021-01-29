const express  = require('express');
const passport = require('passport');
const router   = express.Router();

const User     = require('../database/model/user.model');


router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err){
            if(err.message === 'A user with the given username is already registered'){
                res.redirect('/login');
            } else {
                console.log(err)
                res.sendStatus('500');
            }
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secrets');
            });
        }
    });
});

module.exports = router;