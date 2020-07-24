const bodyParser = require('body-parser');
const ejs        = require('ejs');
const express    = require('express');
const mongoose   = require('mongoose');

const app = express();

const home     = require('./routes/home');
const login    = require('./routes/login');
const register = require('./routes/register');

require('dotenv').config()


//Mongoose
mongoose.connect(`mongodb://${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// View engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Roots
app.use('/', home);
app.use('/login', login);
app.use('/register', register);


// Server port
const port = process.env.APP_PORT === undefined ? 3000 : process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});