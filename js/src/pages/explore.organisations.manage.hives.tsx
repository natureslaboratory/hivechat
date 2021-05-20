import React = require('react');
import ReactDOM = require('react-dom');
import Hives from "../components/Hives";


function OrgHives() {
    return (
        <div className="c-hives-container">
            <Hives type="Public" adminPage={true} />
            <Hives type="Private" adminPage={true} />
            <Hives type="Draft" adminPage={true} />
        </div>
    )
}

const hives = document.getElementById("admin-hives");
if (hives) {
    ReactDOM.render(<OrgHives />, hives);
}