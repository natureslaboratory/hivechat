import React from 'react';
import ReactDOM from 'react-dom';
import Notifications from '../components/Notifications';

const notificationDiv = document.getElementById("notifications");
if (notificationDiv) {
    ReactDOM.render(<Notifications />, notificationDiv);
}