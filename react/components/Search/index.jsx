/**
 * Created by urielbertoche on 03/07/15.
 */
/** @jsx React.DOM */

var React = require('react/addons');
var GitOrg = require('../../../server/api/github');

var Search = React.createClass({

  getInitialState: function() {
    return {
      value: 'default'
    };
  },

  handleChange: function (event) {
    this.setState({value: event.target.value});
  },

  handleKeyDown: function (event) {
    if (event.keyCode == 13) {
      this.getGitMembers();
    }
  },

  getGitMembers: function () {
    var organization = new GitOrg(this.state.value);
    organization.getMembers();
  },

  render: function () {
    var value = this.state.value;
    return (
      <div id="table-area">
        <input id="search" type="text" value={value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} />
      </div>
    )
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Search;