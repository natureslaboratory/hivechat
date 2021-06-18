import React, { useEffect, useState } from 'react';
import { FileBlock } from '../Forms/FileForm';

interface FileProps {
    files : string[]
    description : string
    title? : string
}

const File : React.FC<FileBlock> = (props) => {
    return (
        <>
            <a href={null}>Download</a>        
            <div dangerouslySetInnerHTML={{__html: props.description}}></div>
        </>     
    )
}

export default File;