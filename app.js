require('dotenv').config();
const bodyParser            = require('body-parser');
const express               = require('express');
const mongoose              = require('mongoose');
const session               = require('express-session');
const passport              = require('passport');

const app = express();

const home     = require('./routes/home');
const login    = require('./routes/login');
const logout   = require('./routes/logout');
const register = require('./routes/register');
const secrets  = require('./routes/secrets');


// Environment variable
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;


//Mongoose
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'My little secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// View engine
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Roots
app.use('/', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/secrets', secrets);


// Server port
app.listen(app.get('port'), () => {
    console.log("Server listening on port: " + app.get('port'));
});