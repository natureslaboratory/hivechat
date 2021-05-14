import React = require('react');
import ReactDOM = require('react-dom');
import Invites from '../components/Invites';


const invites = document.getElementById("invites");
if (invites) {
    ReactDOM.render(<Invites />, invites);
}