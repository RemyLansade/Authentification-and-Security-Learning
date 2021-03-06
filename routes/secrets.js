const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated()){
        res.render('secrets');
    } else {
        res.redirect('login');
    }
});

module.exports = router;