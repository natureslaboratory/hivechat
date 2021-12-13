import React from 'react';

const Card: React.FC = (props) => {
    return (
        <div className="card mb-3">
            {props.children}
        </div>
    )
}

export const CardHeader: React.FC<{ title: string }> = (props) => {
    return (
        <div className="card-header" style={{display: "flex", justifyContent: "space-between"}}>
            <h5 style={{ margin: 0 }} className="card-title m-b-0">{props.title}</h5>
            {props.children}
        </div>
    )
}

export default Card;

export const CardBody: React.FC = (props) => {
    return (
        <div className="card-body">
            {props.children}
        </div>
    )
}