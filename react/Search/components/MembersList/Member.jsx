/** @jsx React.DOM */

var React = require('react/addons');

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
          <div className="row-fluid">
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
            <div className="col-md-4 Member-Price vcenter">
              <h1>$ {profile.price} / hora</h1>
            </div>
            <div className="col-md-4 vcenter">
              <div className="form-inline">
                <div className="form-group">
                  <label for="horas{profile.id}">Horas à contratar</label>
                  <input className="form-control" id="horas{profile.id}" placeholder="Horas" />
                </div>
                <button className="btn btn-success">Adicionar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Member;