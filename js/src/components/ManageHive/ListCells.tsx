import React, { useState } from 'react';
import { CellEditorProps } from '../NewCell/Editor/NewCellEditor';
import CellPreview from './CellPreview';
import { CellProps } from './ManageCell';

interface ListCellsProps {
    cells: CellProps[]
}

interface ListCellsFuncs {
    getCells(): void
    setCell(cellID: number): void
}

const ListCells: React.FunctionComponent<ListCellsProps & ListCellsFuncs> = ({ cells, getCells, setCell }) => {

    function generateKey() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function selectCell(cellID: number) {
        setCell(cellID);
    }

    return (
        <div className="cells" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {cells.map(c => <CellPreview cell={c} selectCell={() => selectCell(c.cellID)} key={generateKey()} />)}
        </div>
    )
}

export default ListCells;