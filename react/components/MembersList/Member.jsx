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
    var data = this.props.data;
    return (
      <div className="Member row">
        <div className="Member-avatar col-md-2">
          <img src={data.avatar_url} width="100" />
        </div>
        <div className="col-md-10">
          <h5>{data.login}</h5>
          <p>{data.starred_url}</p>
        </div>
      </div>
    );
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Member;