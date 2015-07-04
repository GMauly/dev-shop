/** @jsx React.DOM */

var React = require('react/addons');
var CartItem = require('./CartItem.jsx');
var GitMember = require('../../server/api/git/member').GitMember

var Cart = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      items: []
    };
  },

  componentDidMount: function () {
    var self = this;
    var request = require('request');
    var options = {
      url: window.location.origin + '/api/cart/'
    };

    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        self.props.items = JSON.parse(body);
        self.forceUpdate();
      } else {
        console.log(error);
      }
    });
  },

  render: function () {
    var items = this.props.items;
    return (
      <div id="table-area">
        {items.map(function (item) {
          var profile = new GitMember(item);
          return <CartItem key={item.id} data={item} profile={profile} />
        })}
      </div>
    )
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Cart;