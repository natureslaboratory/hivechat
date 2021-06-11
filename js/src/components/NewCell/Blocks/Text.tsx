import React, { useEffect, useState } from 'react';

interface TextProps {
    content : string
}

const Text : React.FC<TextProps> = (props) => {
    return (
        <div dangerouslySetInnerHTML={props.content && {__html: props.content}}></div>        
    )
}

export default Text;