/**
 * Created by urielbertoche on 03/07/15.
 */

module.exports = function(app){
  var github = require('./api/github');
  var cart = require('./api/cart');

  app.use('/api/github', github);
  app.use('/api/cart', cart);
}