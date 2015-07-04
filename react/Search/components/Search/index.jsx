/** @jsx React.DOM */

var React = require('react/addons');

var MembersList = require('../MembersList/MembersList.jsx');

var Search = React.createClass({
  propTypes: {
    members: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      members: []
    };
  },

  getInitialState: function() {
    return {
      value: ''
    };
  },

  componentDidMount: function () {
    var self = this;
    var value = window.location.pathname.replace('/', '');

    window.onpopstate = function(e) {
      self.componentDidMount();
    };

    this.setState({value: value});

    if (value.length > 2) {
      this.forceUpdate(this.getGitMembers);
    }
  },

  handleChange: function (event) {
    this.setState({value: event.target.value});
  },

  updateList: function () {
    var urlPath = '/' + this.state.value;
    window.history.pushState(
      {
        members: this.props.members,
        pageTitle: 'Dev-Shop - Organização: ' + this.state.value
      },
      'Dev-Shop - Organização: ' + this.state.value,
      urlPath
    );

    this.forceUpdate(this.componentDidMount);
  },

  handleKeyDown: function (event) {
    if (event.keyCode == 13) {
      this.updateList();
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.members != nextProps.members || this.state.value != nextState.value;
  },

  getGitMembers: function () {
    var self = this;
    var http = require('http');
    var options = {
      host: window.location.hostname,
      port: window.location.port,
      path: '/api/github/getMembers/' + this.state.value
  };

    http.get(options, function (response) {
      response.on('data', function (data) {
        self.props.members = JSON.parse(data);
        self.forceUpdate();
      });
    }).on('error', function (error) {
      console.log('attemp to connect to api failed: ' + error.message);
    });

  },

  render: function () {
    var value = this.state.value;
    var members = this.props.members;
    return (
      <div id="table-area">
        <div className="form-group">
          <input className="form-control" placeholder="Nome da organização" id="search" type="text" value={value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} />
        </div>

        <MembersList members={members} />
      </div>
    )
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = Search;