import React = require('react');
import ReactDOM = require('react-dom');
import ManageHive from '../components/ManageHive/ManageHive';


const manageHive = document.getElementById("manage-hive");
if (manageHive) {
    console.log(manageHive)
    ReactDOM.render(<ManageHive />, manageHive);
}