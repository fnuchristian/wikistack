module.exports = function(swig) {
  var markDownToHtml = require('marked');
  var markedFilter = function(body) {
    return markDownToHtml(body);
  };

  markedFilter.safe = true;
  swig.setFilter('marked', markedFilter);
};