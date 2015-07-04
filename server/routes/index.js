var express = require('express');
var router = express.Router();


var React = require('react/addons'),
  Search = React.createFactory(require('../../react/Search/components/Search/index.jsx'));

/* GET home page. */
router.get('/:org?', function(req, res, next) {
  console.log(req.sessionID);
  var reactHtml = React.renderToString(Search());
  res.render('index', { reactOutput: reactHtml });
});

module.exports = router;
