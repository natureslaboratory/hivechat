import React, { useEffect, useState } from 'react';
import Row from '../../Row';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import Message, { MessageProps } from '../../Message';

interface CreateCellProps {
    hiveID: number
    addCell(newCell: CellDetails): void
    cancelCreateCell(): void
}

export interface CellDetails {
    cellID?: string
    cellTitle: string
    cellSubtitle?: string
    cellDate: string
    cellTime: string
}

const CreateCell: React.FC<CreateCellProps> = (props) => {
    const blankCell = {
        cellTitle: "",
        cellDate: "",
        cellTime: "",
        cellSubtitle: ""
    }
    const [newCell, setNewCell] = useState<CellDetails>(blankCell)
    const [message, setMessage] = useState<MessageProps>(null);

    function reset(e) {
        e.preventDefault();
        setNewCell(blankCell);
        setMessage(null)
    }

    let content = null;

    if (message && message.type == "Success") {
        content = (
            <>
                <Message {...message} />
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={reset}>Create Another</button>
                </div>
            </>
        )
    } else {
        content = (
            <>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={newCell.cellTitle} onChange={(e) => setNewCell({ ...newCell, cellTitle: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <input type="text" className="form-control" value={newCell.cellSubtitle} onChange={(e) => setNewCell({ ...newCell, cellSubtitle: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <div className="c-date-time-form">
                        <input type="date" className="form-control" value={newCell.cellDate} onChange={(e) => setNewCell({ ...newCell, cellDate: e.target.value })} />
                        <input type="time" className="form-control" value={newCell.cellTime} onChange={(e) => setNewCell({ ...newCell, cellTime: e.target.value })} />
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        props.addCell(newCell)
                    }
                    }>Create</button>
                    <button className="btn btn-secondary" onClick={(e) => {
                        e.preventDefault()
                        props.cancelCreateCell();
                    }}>Cancel</button>
                </div>
            </>
        )
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Create Cell</h5>
                <form>
                    {content}
                </form>
            </div>
        </div>
    )
}

export default CreateCell;

