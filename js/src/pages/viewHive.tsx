import React = require('react');
import ReactDOM = require('react-dom');
import Hive from '../components/Hive';


const hive = document.getElementById("hive");
if (hive) {
    console.log(hive)
    ReactDOM.render(<Hive />, hive);
}