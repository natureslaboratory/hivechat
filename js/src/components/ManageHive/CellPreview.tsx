import React from 'react';
import { CellProps } from './ManageCell';

interface CellPreviewProps {
    cell : CellProps
}

interface CellPreviewFuncs {
    selectCell(cell : CellProps) : void
}

const CellPreview : React.FunctionComponent<CellPreviewProps & CellPreviewFuncs> = ({cell, selectCell}) => {
    return (
        <>
            <div className="card">
                <div className="card-header" style={{minHeight: "3.5rem", height: "auto"}}>
                    {cell.cellTitle}
                </div>
                <div className="card-body">
                    <button className="btn btn-alternate" onClick={() => selectCell(cell)}>Edit</button>
                </div>
            </div>
        </>
    )
}

export default CellPreview;