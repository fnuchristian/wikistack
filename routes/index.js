var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  models.Page.find(function(err, pages) {
    res.render('index', { header: 'Browse My Wikistack', pages: pages });
  });
});

module.exports = router;