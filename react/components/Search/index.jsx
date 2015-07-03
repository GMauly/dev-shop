/**
 * Created by urielbertoche on 03/07/15.
 */
/** @jsx React.DOM */

var React = require('react/addons');

var Search = React.createClass({

  getInitialState: function() {
    return {
      value: 'default'
    };
  },

  handleChange: function (event) {
    this.setState({value: event.target.value});
    this.setState({value: event.target.value / 2});
    console.log(event.target.value);
  },

  render: function () {
    var value = this.state.value;
    return (
      <div id="table-area">
        <input id="search" type="text" value={value} onChange={this.handleChange} />
      </div>
    )
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Search;