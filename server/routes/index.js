var express = require('express');
var router = express.Router();


var React = require('react/addons'),
  Search = React.createFactory(require('../../react/components/Search/index.jsx'));

/* GET home page. */
router.get('/:org?', function(req, res, next) {
  var org = req.params.org;
  if (!org) {
    org = '';
  }
  var reactHtml = React.renderToString(Search());
  res.render('index', { reactOutput: reactHtml });
});

module.exports = router;
