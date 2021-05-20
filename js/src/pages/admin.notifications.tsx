import React = require('react');
import ReactDOM = require('react-dom');
import Notifications from '../components/Notifications';

const notificationDiv = document.getElementById("notifications");
if (notificationDiv) {
    ReactDOM.render(<Notifications />, notificationDiv);
}