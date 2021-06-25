import React = require('react');
import ReactDOM = require('react-dom');
import Hives from "../components/Hives";


function HivesWrapper(props: { orgID: number}) {
    return (
        <div className="c-hives-container">
            {!props.orgID && (<div style={{display: "flex", justifyContent: "flex-end"}}>
                <a href="/admin/your-hives/create"><button className="btn btn-primary">+ New Hive</button></a>
            </div>)}
            <Hives organisationID={props.orgID} type="Public" adminPage={true} />
            <Hives organisationID={props.orgID} type="Private" adminPage={true} />
            <Hives organisationID={props.orgID} type="Draft" adminPage={true} />
        </div>
    )
}

const hives = document.getElementById("admin-hives");
if (hives) {
    const orgID = parseInt(hives.dataset.orgid);
    ReactDOM.render(<HivesWrapper orgID={orgID} />, hives);
}