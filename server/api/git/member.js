/**
 * Created by urielbertoche on 03/07/15.
 */

'use strict';

function GitMember(obj) {
  this.login = obj.login;
  this.id = obj.id;
  this.avatar_url = obj.avatar_url;
  this.gravatar_id = obj.gravatar_id;
  this.url = obj.url;
  this.html_url = obj.html_url;
  this.followers_url = obj.followers_url;
  this.following_url = obj.following_url;
  this.gists_url = obj.gists_url;
  this.starred_url = obj.starred_url;
  this.subscriptions_url = obj.subscriptions_url;
  this.organizations_url = obj.organizations_url;
  this.repos_url = obj.repos_url;
  this.events_url = obj.events_url;
  this.received_events_url = obj.received_events_url;
  this.type = obj.type;
  this.site_admin = obj.site_admin;
}


module.exports = {
  GitMember: GitMember
}
