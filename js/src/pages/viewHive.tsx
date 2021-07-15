import React = require('react');
import ReactDOM = require('react-dom');
import Hive from '../components/Hive';
import App from './AppWrapper';


const hive = document.getElementById("hive");
if (hive) {
    ReactDOM.render(
    <App>
        <Hive hiveID={parseInt(hive.dataset.hiveid)} organisationLogo={hive.dataset.orglogo} />
    </App>,
    hive);
}