/** @jsx React.DOM */

var React = require('react/addons');
var Member = require('./Member.jsx');

var GitMember = require('../../../../server/api/git/member').GitMember;

var MembersList = React.createClass({

  propTypes: {
      members: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      members: []
    };
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.members !== nextProps.members;
  },

  render: function () {
    var members = this.props.members;
    return (
      <div id="MembersList">
        {members.map(function (member) {
          var profile = new GitMember(member);
          return <Member key={member.id} data={profile} />
        })}
      </div>
    );
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = MembersList;