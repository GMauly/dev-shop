/**
 * Created by urielbertoche on 03/07/15.
 */

'use strict';

var request = require('request');

var github = function (org) {
  var members_url = 'https://api.github.com/orgs/'+org+'/members';


  return {
    members_url: members_url
  }
}

github.prototype.getMembers = function() {
  request(this.members_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
}

module.exports = github;