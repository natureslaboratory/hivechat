import React from 'react';

export interface CellProps {
    cellDateTime : string,
    introduction? : string
    video? : CellVideo
    cellID? : number,
    cellSubTitle? : string,
    cellTitle : string,
    hiveID : number,
    memberID : number
}

interface CellVideo {

}

interface CellFuncs {
    updateCell(cell : CellProps) : void
}

const ManageCell : React.FunctionComponent<CellProps & CellFuncs> = (props) => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4>{props.cellTitle} - {props.cellSubTitle}</h4>
                    <p>{props.cellDateTime}</p>
                </div>
                <div className="card-body">
                    {props.introduction && <div dangerouslySetInnerHTML={{__html: props.introduction}}></div>}
                </div>
            </div>
        </>
    )
}

export default ManageCell;