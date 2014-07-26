var express = require('express');
var router = express.Router();
var passport = require('passport');

// show the login form
router.get('/', function(req, res) {
  // render the page and passes in any flahs message data (for potential errors) if it exists
  res.render('signup_login', {
    message: req.flash('signupMEssage'),
    header: 'Login to Wikistack',
    submit_action: '/login',
    submit_value: 'Login',
    footer_question: 'Need an account? ',
    footer_suggestion: 'Signup',
    footer_link: '/signup',
    password_type: 'password'
  });
});

// process the login form
router.post('/', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the user's profile page
  failureRedirect: '/login', // redirect back to the login page if there's an error
  failureFlash: true
}));

// FACEBOOK LOGIN
// facebook authentication and login
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  })
);

module.exports = router;