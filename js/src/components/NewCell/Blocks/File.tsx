import React, { useEffect, useState } from 'react';
import { FileBlock } from '../Forms/FileForm';

interface FileProps {
    url : string
    description : string
    title? : string
}

const File : React.FC<FileBlock> = (props) => {
    return (
        <>
            <a href={props.url}>Download</a>        
            <p>{props.description}</p>  
        </>     
    )
}

export default File;