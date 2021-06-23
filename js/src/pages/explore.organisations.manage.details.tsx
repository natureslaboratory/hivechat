import React = require('react');
import ReactDOM = require('react-dom');
import Socials from '../components/Socials';

let socialList = document.getElementById("social-list");
if (socialList) {
    ReactDOM.render(<Socials />, socialList);
}