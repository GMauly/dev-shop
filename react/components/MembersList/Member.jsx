/** @jsx React.DOM */

var React = require('react/addons');
var GitMember = require('../../../server/api/git/member').GitMember;

var Member = React.createClass({

  propTypes: {
    data: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      data: {}
    };
  },

  render: function () {
    var profile = this.props.data;

    if (profile.followers === '') {
      profile.load(this);
    }

    return (
      <div className="Member row">
        <div className="Member-avatar col-md-3">
          <img src={profile.getAvatarUrl()} />
        </div>
        <div className="Member-info col-md-9">
          <div className="row">
            <div className="col-md-4">
              <h3>{profile.login}</h3>
              <ul className="list-inline">
                <li><strong className="Member-info-data">{profile.followers}</strong>
                  <span className="text-muted">Followers</span></li>
                <li><strong className="Member-info-data">{profile.starred}</strong>
                  <span className="text-muted">Starred</span></li>
                <li><strong className="Member-info-data">{profile.following}</strong>
                <span className="text-muted">Following</span></li>
              </ul>
            </div>
            <div className="col-md-6 Member-Price vcenter">
              <h1>$ {profile.price} / hora</h1>
            </div>
            <div className="col-md-2 vcenter">
              <button className="btn btn-primary">Adicionar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Member;