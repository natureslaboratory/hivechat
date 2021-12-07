import React from 'react';
import ReactDOM from 'react-dom';
import Invites from '../components/Invites';
import AddMembersWrapper from '../components/AddMembersWrapper';


const invites = document.getElementById("invites");
if (invites) {
    ReactDOM.render(<Invites />, invites);
}

const addFile = document.getElementById("file-upload");
if (addFile) {
    ReactDOM.render(<AddMembersWrapper />, addFile);
}