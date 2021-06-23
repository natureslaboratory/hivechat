import React = require('react');
import ReactDOM = require('react-dom');
import Hives from "../components/Hives";


function OrgHives(props: { orgID: number}) {
    return (
        <div className="c-hives-container">
            <Hives organisationID={props.orgID} type="Public" adminPage={false} />
            <Hives organisationID={props.orgID} type="Private" adminPage={false} />
        </div>
    )
}

const hives = document.getElementById("hives");
if (hives) {
    const orgID = parseInt(hives.dataset.orgid);
    ReactDOM.render(<OrgHives orgID={orgID} />, hives);
}