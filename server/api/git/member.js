/**
 * Created by urielbertoche on 03/07/15.
 */

'use strict';

var request = require('request');
var GitUrls = require('./urls');

var lastModified = new Date();
lastModified.setMinutes(120);

var options = {
  url: '',
  headers: {
    'User-Agent': 'urielb',
    'If-Modified-Since': lastModified.toUTCString()
  }
};

function GitMember(obj) {
  this.login = obj.login;
  this.id = obj.id;
  this.type = obj.type;
  this.site_admin = obj.site_admin;

  this.followers = '';
  this.starred = '';
  this.following = '';

  this.price = 0;
}

GitMember.prototype.getPrice = function (callback) {
  var following = parseFloat(this.following);
  var starred = parseFloat(this.starred);
  var followers = parseFloat(this.followers);

  var price = (following * 2) + (starred * 3.5);
  price = price * ((3 * followers) / (followers + following));

  this.price = round(price, 2);

  callback();
}

GitMember.prototype.load = function (react) {
  var self = this;
  self.getFollowers(function () {
    self.getFollowing(function () {
      self.getStarred(function () {
        self.getPrice(function () {
          react.forceUpdate();
        });
      });
    });
  });
}

GitMember.prototype.getAvatarUrl = function () {
  var url = GitUrls.avatar_url;
  url = url.replace('{id}', this.id);
  return url;
}

GitMember.prototype.getFollowers = function (callback) {
  var self = this;
  var options = {
    url: 'http://localhost:3000/api/github/getFollowers/' + this.login
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      self.followers = body;
      callback();
    };
  });
}

GitMember.prototype.getFollowing = function (callback) {
  var self = this;
  var options = {
    url: 'http://localhost:3000/api/github/getFollowing/' + this.login
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      self.following = body;
      callback();
    };
  });
}

GitMember.prototype.getStarred = function (callback) {
  var self = this;
  var options = {
    url: 'http://localhost:3000/api/github/getStarred/' + this.login
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      self.starred = body;
      callback();
    };
  });
}

function getFollowers(req,res) {
  var user = req.params.user;
  var url = GitUrls.followers_url;
  url = url.replace('{login}', user);
  options.url = url;

  // Mocking results for when github API stops responding
  return res.end("" + random(30));

  // Connect to Github API and returns followers
  var req = request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json_parsed = JSON.parse(body);
      res.end("" + json_parsed.length);
    }
  });
}

function getFollowing(req,res) {
  var user = req.params.user;
  var url = GitUrls.following_url;
  url = url.replace('{login}', user);
  options.url = url;

  // Mocking results for when github API stops responding
  return res.end("" + random(30));

  // Connect to Github API and returns followers
  var req = request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json_parsed = JSON.parse(body);
      res.end("" + json_parsed.length);
    }
  });
}

function getStarred(req,res) {
  var user = req.params.user;
  var url = GitUrls.starred_url;
  url = url.replace('{login}', user);
  options.url = url;

  // Mocking results for when github API stops responding
  return res.end("" + random(30));

  // Connect to Github API and returns followers
  var req = request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json_parsed = JSON.parse(body);
      res.end("" + json_parsed.length);
    }
  });
}

function random(max) {
  var rand = Math.random() * max + 1;

  return Math.floor(rand);
}

function round (value, decimal_places) {
  var c_p = "e+" + decimal_places;
  var c_m = "e-" + decimal_places;
  return +(Math.round(value + c_p) + c_m);
}

module.exports = {
  GitMember: GitMember,
  methods: {
    getFollowers: getFollowers,
    getFollowing: getFollowing,
    getStarred: getStarred
  }
}
