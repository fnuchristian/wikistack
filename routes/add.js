var express = require('express');
var router = express.Router();
var models = require('../models');

/* Add a page. */
router.get('/', function(req, res) {
  res.render('add_edit', { header: 'Add a Page', submit_action: "/add/submit", submit_label: "Add" });
});

router.post('/submit', function(req, res) {
  var title = req.body.pageTitle,
      content = req.body.pageContent;

  console.log(title, content);
  var pageToAdd = new models.Page({ title: title, content: content });
  pageToAdd.save();
  res.redirect('/');
});

module.exports = router;
