import React = require('react');
import ReactDOM = require('react-dom');
import Invites from '../components/Invites';
import AddMembersWrapper from '../components/AddMembersWrapper';


const invites = document.getElementById("invites");
if (invites) {
    ReactDOM.render(<Invites />, invites);
}

const addFile = document.getElementById("file-upload");
if (addFile) {
    console.log("add file rendering")
    ReactDOM.render(<AddMembersWrapper />, addFile);
}