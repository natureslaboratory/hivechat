import React = require('react');
import ReactDOM = require('react-dom');
import Hives from "../components/Hives";


function OrgHives() {
    return (
        <div className="c-hives-container">
            <Hives type="Public" adminPage={false} />
            <Hives type="Private" adminPage={false} />
        </div>
    )
}

const hives = document.getElementById("hives");
if (hives) {
    ReactDOM.render(<OrgHives />, hives);
}