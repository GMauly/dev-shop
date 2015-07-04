var express = require('express');
var router = express.Router();


var React = require('react/addons'),
  Search = React.createFactory(require('../../react/Search/components/Search/index.jsx')),
  Cart = React.createFactory(require('../../react/Cart/Cart.jsx'));

/* GET cart page */
router.get('/cart/', function(req, res, next) {
  var reactHtml = React.renderToString(Cart());
  res.render('cart', { reactOutput: reactHtml });

});

/* GET search page. */
router.get('/:org?', function(req, res, next) {
  var reactHtml = React.renderToString(Search());
  res.render('index', { reactOutput: reactHtml });
});

module.exports = router;
