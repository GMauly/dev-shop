var express = require('express');
var router = express.Router();


var React = require('react/addons'),
  Search = React.createFactory(require('../../react/components/Search/index.jsx'));

/* GET home page. */
router.get('/', function(req, res, next) {
  var reactHtml = React.renderToString(Search());
  res.render('index', { reactOutput: reactHtml });
});

module.exports = router;
