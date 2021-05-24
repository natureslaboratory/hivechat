import React, { useState, useEffect } from 'react';

export interface CellSmall {
    cellID : number,
    cellTitle: string
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
    
    return (
        <li className={`list-group-item ${props.active ? "active" : ""}`}>
            <h5 className="list-group-item-heading">{props.cellTitle}</h5>
            <p className="list-group-item-text"></p>
            {props.active ? null : button}
        </li>
    )
}

export default HiveNavItem;