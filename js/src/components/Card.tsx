import React from 'react';

export type CardProps = {
    title: string
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <h5 style={{ margin: 0 }} className="card-title m-b-0">{props.title}</h5>
            </div>
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