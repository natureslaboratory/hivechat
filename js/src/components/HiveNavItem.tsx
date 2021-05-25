import React, { useState, useEffect } from 'react';
import { formatDate } from './Cell';

export interface CellSmall {
    cellID : number,
    cellTitle: string,
    cellDateTime : string,
    cellSubTitle? : string
}

interface HiveNavItemProps {
    active : boolean
    selectCell(cellID : number) : void
}

const HiveNavItem : React.FunctionComponent<CellSmall & HiveNavItemProps> = (props) => {
    let button = <button onClick={(e) => {
        e.preventDefault();
        props.selectCell(props.cellID);
    }} className="btn btn-small btn-primary">View</button>;

    let subtitle = null;
    if (props.cellSubTitle) {
        subtitle = props.cellSubTitle
    }
    
    let date = "";
    if (props.cellDateTime !== "2000-01-01 00:00:00") {
        date = props.cellDateTime ? formatDate(new Date(props.cellDateTime)) : "";
    }

    return (
        <li style={{cursor: "pointer"}} onClick={() => {
            props.selectCell(props.cellID);
        }} className={`list-group-item ${props.active ? "active" : ""}`}>
            <h5 style={{fontSize: "1.15rem", marginBottom: "0.3rem"}} className="list-group-item-heading">{props.cellTitle}</h5>
            <div style={{opacity: 0.85}}>
                <p style={{marginBottom: 0}}>{subtitle}{(subtitle && date) ? " - " : ""}{date}</p>
            </div>
        </li>
    )
}

export default HiveNavItem;