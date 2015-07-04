/** @jsx React.DOM */

var React = require('react/addons');
var Cart = React.createFactory(require('./Cart.jsx'));

var mountNode = document.getElementById("react-main-mount");

React.render(Cart(), mountNode);