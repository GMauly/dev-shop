/** @jsx React.DOM */

var React = require('react/addons');
var Search = React.createFactory(require('./components/Search/index.jsx'));

var mountNode = document.getElementById("react-main-mount");

React.render(Search(), mountNode);