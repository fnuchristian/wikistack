var express = require('express');
var router = express.Router();
var models = require('../models');

// route for loggin out
router.get('/', function(req, res) {
  req.logout(); // this logout function is provided by passport
  res.redirect('/');
});

module.exports = router;