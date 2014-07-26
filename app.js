var express = require('express');
var swig = require('swig'); // swig templating engine
var passport = require('passport');
var flash = require('connect-flash');

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session'); // required for session, has to be put after cookieParser

var routes = require('./routes/index');
var authenticate = require('./routes/authenticate');
var add = require('./routes/add');
var wiki = require('./routes/wiki');
var login = require('./routes/login');
var logout = require('./routes/logout');
var signup = require('./routes/signup');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// swig configuration
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
// swig HTML markdown filter
require('./filters')(swig);

// configure passport
require('./config/passport')(passport); // passport object is passed from the server.js file

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passportJS
app.use(session({ secret: 'privatewikistack' })); // session secret, the salt used to encrypt the session ids which are stored in the client's browser.
app.use(passport.initialize()); // creates our passport object
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes);
app.use('/authenticate', authenticate);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/wiki', wiki);

function isLoggedIn(req, res, next) {
  /*
  note that this is a function declaration, not an expression.
  it loads before any code is called -- compare this with a
  function expression.  Why do we use this?
  Read more: http://stackoverflow.com/q/1013385/66355
  */
  if (req.isAuthenticated()) { return next(); }

  res.redirect('/authenticate'); // if not authenticated, redirect to authenticate page
}

app.all('*', isLoggedIn); // this means, whatever url comes after this expression will have to use isLoggedIn function

app.use('/add', add);
app.use('/profile', profile);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    swig.setDefaults({ cache: false });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
