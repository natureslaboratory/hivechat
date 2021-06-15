import React = require('react');
import ReactDOM = require('react-dom');
import Cell from '../components/NewCell/Cell';
import CreateCell from '../components/NewCell/Editor/CreateCell';
import UpdateCell from '../components/NewCell/Editor/EditCellDetails';
import CellEditor from '../components/NewCell/Editor/NewCellEditor';

const manageHive = document.getElementById("test");
if (manageHive) {
    ReactDOM.render(
    <Cell cellID={1} hiveID={1} />, manageHive);
}

const editCell = document.getElementById("edit-cell");
if (editCell) {
    // ReactDOM.render(<CellEditor cellID={1} />, editCell);
}

const createCell = document.getElementById("create-cell");
if (createCell) {
    // ReactDOM.render(<CreateCell organisationID={createCell.dataset.organisationID && parseInt(createCell.dataset.organisationID)} />, createCell)
}
