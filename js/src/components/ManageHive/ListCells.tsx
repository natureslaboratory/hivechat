import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ICell } from '../NewCell/Cell';
import CellPreview from './CellPreview';

interface ListCellsProps {
    cells: ICell[]
}

interface ListCellsFuncs {
    getCells(): void
    setCell(cellID: number): void
    handleDrop(drop: DropResult): void
}

const ListCells: React.FunctionComponent<ListCellsProps & ListCellsFuncs> = ({ cells, getCells, setCell, handleDrop }) => {

    function generateKey() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function selectCell(cellID: number) {
        setCell(cellID);
    }

    return (
        <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId={"id"}>
                {(provided) => (
                    <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        key={"id"}
                        className="cells c-block-container" 
                    >
                        {cells.map((c, i) => <CellPreview key={c.cellID} index={i} cell={c} selectCell={() => selectCell(c.cellID)} /> )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default ListCells;