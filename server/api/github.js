/**
 * Created by urielbertoche on 03/07/15.
 */

'use strict';

var request = require('request');

var options = {
  headers: {
    'User-Agent': 'urielb'
  }
};

function GitOrg (org) {
  this.members_url = 'https://api.github.com/orgs/'+org+'/members';
}

GitOrg.prototype.getMembers = function() {
  options['url'] = this.members_url;
  console.log(options.url);
  request(options, function (error, response, body) {
    if (!error) {
      console.log(body);
    }
  });
}

module.exports = {
  GitOrg: GitOrg,
  methods: {
    getMembers: function (req, res) {
      var organization = req.params.organization;
      var org = new GitOrg(organization);
      org.getMembers();
    }
  }
};