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

  getInitialState: function() {
    return {
      value: ''
    };
  },

  handleChange: function (event) {
    this.setState({value: event.target.value});
    var qty = parseFloat(event.target.value);

    if (isNaN(qty)) {
      this.setState({value: 0});
    } else {
      this.props.data.qty = qty;
    }
  },

  addToCart: function () {
    var profile = this.props.data;
    var self = this;
    var request = require('request');
    var options = {
      url: window.location.origin + '/api/cart/' + profile.login + '/' + profile.id + '/' + profile.price + '/' + profile.qty
    };

    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        alert(body);
      } else {
        console.log(error);
      }
    });
  },

  render: function () {
    var profile = this.props.data;
    var value = this.state.value;
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
                  <span className="text-muted">Seguidores</span></li>
                <li><strong className="Member-info-data">{profile.starred}</strong>
                  <span className="text-muted">Favoritados</span></li>
                <li><strong className="Member-info-data">{profile.following}</strong>
                  <span className="text-muted">Seguindo</span></li>
              </ul>
            </div>
            <div className="col-md-4 Member-Price vcenter">
              <h1>$ {profile.price} / hora</h1>
            </div>
            <div className="col-md-4 vcenter">
              <div className="form-inline">
                <div className="form-group">
                  <label for="horas">Horas à contratar</label>
                  <input className="form-control" type="text"
                         id="horas" value={value} placeholder="Horas"
                         onChange={this.handleChange} />
                </div>
                <button className="btn btn-success" onClick={this.addToCart}>Adicionar</button>
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