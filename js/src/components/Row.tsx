import React from 'react';

const Row: React.FC = (props) => {
    return (
        <div className="row" style={{padding: "0px 1rem"}}>
            {props.children}
        </div>
    )
}

export default Row;