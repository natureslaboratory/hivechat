import React, { useState, useEffect } from 'react';
import HiveNavItem, { CellSmall } from './HiveNavItem';

export interface HiveNavProps {
    cells : CellSmall[],
    currentCellID : number 
}

interface HiveNavFuncs {
    selectCell(cellID : number) : void
}

const HiveNav : React.FunctionComponent<HiveNavProps & HiveNavFuncs> = (props) => {
    return (
        <div className="main-card mb-3 card">
            <div className="card-body">
                <div className="card-title">
                    Cells
                </div>
                <ul className="list-group">
                    {props.cells.map(c => <HiveNavItem selectCell={props.selectCell} active={c.cellID == props.currentCellID} {...c} key={c.cellID} />)}
                </ul>
            </div>
        </div>
    )
}

export default HiveNav;