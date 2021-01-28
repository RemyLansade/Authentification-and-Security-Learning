const bodyParser            = require('body-parser');
const express               = require('express');
const mongoose              = require('mongoose');
const session               = require('express-session');
const passport              = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

const home     = require('./routes/home');
const login    = require('./routes/login');
const register = require('./routes/register');


// Environment variable
require('dotenv').config();
const appPort = process.env.APP_PORT;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;


//Mongoose
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true});


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'My little secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));


// View engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Roots
app.use('/', home);
app.use('/login', login);
app.use('/register', register);


// Server port
const port = appPort === undefined ? 3000 : appPort;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});