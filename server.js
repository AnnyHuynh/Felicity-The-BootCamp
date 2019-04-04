var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

var PORT = process.env.PORT || 8000;

//env
require('dotenv').load();

// Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Handlebars
app.set('views', './app/views');
app.engine(
  'hbs',
  exphbs({
    layoutsDir: './app/views/layouts',
    defaultLayout: 'main',
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');

// For Passport
app.use(
  session({ secret: 'banayan-tree', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require('./app/models');

//Routes
require('./app/routes/auth.js')(app, passport, models);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}
//Sync Database
models.sequelize
  .sync(syncOptions)
  .then(function() {
    app.listen(PORT, function() {
      console.log(
        '==>  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT
      );
    });
    console.log('Nice! Database looks fine');
  })
  .catch(function(err) {
    console.log(err, 'Something went wrong with the Database Update!');
  });

module.exports = app;
