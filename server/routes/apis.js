/**
 * Created by urielbertoche on 03/07/15.
 */

module.exports = function(app){
  var github = require('./api/github');

  app.use('/api/github', github);
}