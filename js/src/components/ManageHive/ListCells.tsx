import React, { useState } from 'react';
import CellPreview from './CellPreview';
import { CellProps } from './ManageCell';

interface ListCellsProps {
    cells : CellProps[] 
}

interface ListCellsFuncs {
    getCells() : void
}

const ListCells : React.FunctionComponent<ListCellsProps & ListCellsFuncs> = ({cells, getCells}) => {
    const [cell, setCell] = useState<CellProps>(null);

    function generateKey() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function selectCell(cell : CellProps) {
        setCell(cell);
    }

    if (cell) {
        return (
            <div className="card">
                <div className="card-header" style={{justifyContent: "space-between"}}>
                    Edit Cell
                    <button className="btn btn-alternate" onClick={() => setCell(null)}>Back</button>
                </div>
                <form className="card-body">
                    <div className="form-group">
                        <label htmlFor="cellTitle">Title</label>
                        <input className="form-control" type="text" id="cellTitle" value={cell.cellTitle} onChange={(e) => setCell({...cell, cellTitle: e.target.value})} />
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="cells" style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
            {cells.map(c => <CellPreview cell={c} selectCell={selectCell} key={generateKey()} />)}
        </div>
    )
}

export default ListCells;