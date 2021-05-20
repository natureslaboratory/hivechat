import React, { useState, useEffect } from 'react';

interface MemberProps {
    email : string,
    index : number,
    removeEmail(index : number) : void
}

const Member : React.FunctionComponent<MemberProps> = (props) => {

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            {props.email}
            <button 
            className="btn btn-outline-danger"
            onClick={(e) => {
                e.preventDefault();
                props.removeEmail(props.index);
            }}>Remove</button>
        </div>
    )
}

export default Member;