import React = require('react');
import ReactDOM = require('react-dom');
import ManageHive from '../components/ManageHive/ManageHive';


const manageHive = document.getElementById("manage-hive");
if (manageHive) {
    ReactDOM.render(
    <ManageHive 
        organisationSlug={manageHive.dataset.organisationslug} 
        hiveID={parseInt(manageHive.dataset.hiveid)} 
        organisationID={parseInt(manageHive.dataset.organisationid)}
        organisationName={manageHive.dataset.organisationname}
    />, manageHive);
}