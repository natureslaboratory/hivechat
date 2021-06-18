import React, { useEffect, useState } from 'react';

interface TextProps {
    content : string
    small? : boolean
}

const Text : React.FC<TextProps> = (props) => {
    if (props.small) {
        return (
            <>
                <h5 className="card-title">Text</h5>
                <div style={{maxHeight: "100px", overflow: "hidden"}} dangerouslySetInnerHTML={props.content && {__html: props.content}}></div>   
            </>
        )
    }
    return (
        <div dangerouslySetInnerHTML={props.content && {__html: props.content}}></div>        
    )
}

export default Text;