require('dotenv').config();
const express               = require('express');
const bodyParser            = require('body-parser');
const session               = require('express-session');
const passport              = require('passport');
const GoogleStrategy        = require('passport-google-oauth20').Strategy;
const FacebookStrategy      = require('passport-facebook').Strategy;

const app = express();


// Relative path
const User                  = require('./database/model/user.model');
const DbConnection          = require('./database/connection');

const oAuth                 = require('./routes/oAuth');
const home                  = require('./routes/home');
const login                 = require('./routes/login');
const logout                = require('./routes/logout');
const register              = require('./routes/register');
const secrets               = require('./routes/secrets');


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "My little secret",
    resave: false,
    saveUninitialized: false,
    cookie : {
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());


// Passport
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


// Setting
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('database', DbConnection);


// Roots
app.use('/', home);
app.use('/auth', oAuth);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/secrets', secrets);
 

// Server port
app.listen(app.get('port'), () => {
    console.log("Server listening on port: " + app.get('port'));
});