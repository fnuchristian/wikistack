var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  var profile = req.user;
  var local, facebook, twitter, google;

  models.Page.find(function(err, pages) {
    res.render('profile', {
      header: 'Your Wikistack Profile',
      profile: profile,
      local: local,
      facebook: facebook,
      twitter: twitter,
      google: google
    });
  });
});

module.exports = router;