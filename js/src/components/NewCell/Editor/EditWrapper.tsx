import React, { useEffect, useState } from 'react';

const EditWrapper : React.FC = (props) => {
    return (
        <div className="main-card mb-3 card">
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}

export default EditWrapper;