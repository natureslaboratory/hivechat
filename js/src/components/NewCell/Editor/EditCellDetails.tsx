import React, { useEffect, useState } from 'react';
import Row from '../../Row';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import { CellDetails } from './CreateCell';

interface EditCellProps {
    updateCell(e: React.MouseEvent<HTMLButtonElement>, cell: CellDetails) : void
    cell: CellDetails
}

const UpdateCell: React.FC<EditCellProps> = (props) => {
    const [cell, setCell] = useState<CellDetails>(null)

    useEffect(() => {
        setCell(props.cell)
    }, [props.cell])

    let content = null;

    if (cell) {
        content = (
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={cell.cellTitle} onChange={(e) => setCell({ ...cell, cellTitle: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <input type="text" className="form-control" value={cell.cellSubtitle} onChange={(e) => setCell({ ...cell, cellSubtitle: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <div className="c-date-time-form">
                        <input type="date" className="form-control" value={cell.cellDate} onChange={(e) => setCell({ ...cell, cellDate: e.target.value })} />
                        <input type="time" className="form-control" value={cell.cellTime} onChange={(e) => setCell({ ...cell, cellTime: e.target.value })} />
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        props.updateCell(e, cell)}
                        }>Save</button>
                </div>
            </form>
        )
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Edit Cell</h5>
                {content}
            </div>
        </div>
    )
}

export default UpdateCell;

