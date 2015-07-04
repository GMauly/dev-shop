/**
 * Created by urielbertoche on 03/07/15.
 */

'use strict';

var request = require('request');

var options = {
  url: '',
  headers: {
    'User-Agent': 'urielb'
  }
};

function GitOrg (org) {
  this.members_url = 'https://api.github.com/orgs/'+org+'/members';
}

GitOrg.prototype.getMembers = function(callback) {
  options.url = this.members_url;

  // Connect to Github API and returns the same result as an inner API
  var req = request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}


module.exports = {
  GitOrg: GitOrg,
  methods: {
    getMembers: function (req, res) {
      var organization = req.params.organization;
      var org = new GitOrg(organization);
      res.writeHead(200, {"Content-Type": "application/json"});
      return org.getMembers(res.end.bind(res));
    }
  }
};