import React from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { ICell } from '../NewCell/Cell';

interface CellPreviewProps {
    cell : ICell
    index: number
}

interface CellPreviewFuncs {
    selectCell(cell : ICell) : void
}

const CellPreview : React.FunctionComponent<CellPreviewProps & CellPreviewFuncs> = ({cell, index, selectCell}) => {
    return (
            <Draggable draggableId={"cell_" + cell.cellID.toString()} index={index} >
                {(provided) => (
                    <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        key={cell.cellID.toString()}
                    >
                        <div className="card" style={{marginBottom: "2rem"}}>
                            <div className="card-header" style={{minHeight: "3.5rem", height: "auto"}}>
                                {cell.cellTitle}
                            </div>
                            <div className="card-body">
                                <button className="btn btn-alternate" onClick={() => selectCell(cell)}>Edit</button>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
    )
}

export default CellPreview;