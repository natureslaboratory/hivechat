import React, { useState, useEffect } from 'react';

export interface CellSmall {
    cellID : number,
    cellTitle: string,
    cellSubTitle? : string
}

interface HiveNavItemProps {
    active : boolean
    selectCell(cellID : number) : void
}

const HiveNavItem : React.FunctionComponent<CellSmall & HiveNavItemProps> = (props) => {
    console.log(props)
    let button = <button onClick={(e) => {
        e.preventDefault();
        props.selectCell(props.cellID);
    }} className="btn btn-small btn-primary">View</button>;

    let subtitle = null;
    if (props.cellSubTitle) {
        subtitle = <p style={{marginBottom: 0}} className="list-group-item-text">{props.cellSubTitle}</p>
    }

    return (
        <li style={{cursor: "pointer"}} onClick={() => {
            props.selectCell(props.cellID);
        }} className={`list-group-item ${props.active ? "active" : ""}`}>
            <h5 className="list-group-item-heading">{props.cellTitle}</h5>
            {subtitle}
        </li>
    )
}

export default HiveNavItem;