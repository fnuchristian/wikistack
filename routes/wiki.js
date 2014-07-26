var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET wiki page. */
router.get('/:url_name', function(req, res) {
  var url_name = req.params.url_name;

  models.Page.findOne({ url_name: url_name }, function(err, page) {
    res.render('wiki', { title: page.title, content: page.content, show_edit_delete: true, url_name: url_name });
  });
});

router.get('/:url_name/edit', function(req, res) {
  var url_name = req.params.url_name;

  models.Page.findOne({ url_name: url_name }, function(err, page) {
    res.render('add_edit', {
      header: "Edit a page",
      title: page.title,
      content: page.content,
      submit_action: "/wiki/" + url_name + "/edit" + "/submit",
      submit_label: "Edit"
    });
  });
});

router.post('/:url_name/edit/submit', function(req, res) {
  var url_name = req.params.url_name;
  var newTitle = req.body.pageTitle,
      newContent = req.body.pageContent;

  models.Page.findOne({ url_name: url_name }, function(err, page) {
    page.title = newTitle;
    page.content = newContent;
    page.save(function(err, page) {
      res.redirect('/wiki/' + page.url_name);
    });
  });
});

router.get('/:url_name/delete', function(req, res) {
  var url_name = req.params.url_name;

  models.Page.findOneAndRemove({ url_name: url_name }, function(err, page) {
    res.redirect('/');
  });
});

module.exports = router;



// /* GET home page. */
// router.get('/', function(req, res) {
//   var is_deleted = req.query.deleted;
//   var deleted;

//   if (is_deleted === "true") {
//     deleted = true;
//   } else {
//     deleted = false;
//   }

//   var pages = models.Page.find(function(err, pages) {
//     res.render('home', {
//       pages: pages,
//       deleted: deleted,
//       user: req.user
//     });
//   });
//   models.Page.find(function(err, pages) {
//     res.render('index', { header: 'Browse My Wikistack', pages: pages });
//   });

// });