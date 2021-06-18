import React, { useEffect, useState } from 'react';

interface BlockProps {
    title? : string
}

const Block : React.FC<BlockProps> = (props) => {
    return (
        <div className="main-card mb-3 card">
            <div className="card-body">
                {props.title && <h5 className="card-title">{props.title}</h5>}
                {props.children}
            </div>
        </div>
    )
}

export default Block;