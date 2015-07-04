/** @jsx React.DOM */

var React = require('react/addons');

var CartItem = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    profile: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      data: {},
      profile: {}
    };
  },

  componentDidMount: function () {
  },

  removeFromCart: function () {
    var self = this;
    var request = require('request');
    var options = {
      url: window.location.origin + '/api/cart/' + this.props.data.id
    };

    request.del(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        alert(body);
        self.forceUpdate();
      } else {
        console.log(error);
      }
    });
  },

  render: function () {
    var profile = this.props.profile;
    if (profile.followers == "") {
      profile.load(this);
    }
    var data = this.props.data;
    console.log(data);
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
                  <span className="text-muted">Seguidores</span></li>
                <li><strong className="Member-info-data">{profile.starred}</strong>
                  <span className="text-muted">Favoritados</span></li>
                <li><strong className="Member-info-data">{profile.following}</strong>
                  <span className="text-muted">Seguindo</span></li>
              </ul>
            </div>
            <div className="col-md-7 Member-Price vcenter">
              <h1>Preço total:<br />$ {data.total_price} por {data.qty} horas </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = CartItem;