import React, { useEffect, useState } from 'react';
import { FileBlock } from '../Forms/FileForm';

const File : React.FC<FileBlock> = (props) => {
    return (
        <>
            {props.title && <h5 className="card-title">{props.title}</h5>}
            {props.description && <div dangerouslySetInnerHTML={{__html: props.description}} />}
            {props.currentFiles.map((f, i) => {
                return (
                    <div key={i}>
                        <a download={encodeURI(f.fileName)} href={encodeURI(f.fileLocation)}>{f.fileName}</a>
                    </div>
                )
            })}
        </>     
    )
}

export default File;