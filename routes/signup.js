var express = require('express');
var router = express.Router();
var passport = require('passport');

// show the signup form
router.get('/', function(req, res) {
  //renders the page and passes in any flash data if it exists
  res.render('signup_login', {
    message: req.flash('signupMEssage'),
    header: 'Signup to Wikistack',
    submit_action: '/signup',
    submit_value: 'Signup',
    footer_question: 'Already have an account? ',
    footer_suggestion: 'Login',
    footer_link: '/login',
    password_type: 'text'
  });
});

// process the signup form
router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/profile', // where successful redirects get redirected
  failureRedirect: '/signup', // where failed authentication gets redirected
  failureFlash: true
}));

module.exports = router;