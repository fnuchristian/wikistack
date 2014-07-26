var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET landing page. */
router.get('/', function(req, res) {
  res.render('authenticate', { header: "Authenticate to WikiStack" });
});

// route for loggin out
router.get('/logout', function(req, res) {
  req.logout(); // this logout function is provided by passport
  res.redirect('/');
});

module.exports = router;