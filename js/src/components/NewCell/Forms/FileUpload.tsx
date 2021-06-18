import { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';

interface FileUploadProps {
    addFile(file: TempFile): void
    newFiles: TempFile[]
    currentFiles: CustomFile[]
}

export interface TempFile {
    file: File,
    fileName: string
}

export interface CustomFile {
    fileID: number
    fileURL: string
    fileName: string
}

const FileUpload: React.FC<FileUploadProps> = ({addFile, newFiles, currentFiles}) => {
    const ref = useRef<HTMLInputElement>();
    const [showAddForm, setShowAddForm] = useState(false);
    const [file, setFile] = useState<File>(null);
    const [name, setName] = useState("");

    function handleClick() {
        ref.current.click();
    }

    let content = (
        <div className="btn-container">
            <button className="btn btn-primary" onClick={(e) => {
                setShowAddForm(true);
            }}>+ Add File</button>
        </div>
    )

    if (showAddForm) {
        content = (
            <div className="c-add-file-form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                </div>
                <input type="file" onChange={(e) => setFile(e.currentTarget.files[0])} />
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        console.log(file, name);
                        addFile({file, fileName: name});
                        setName("");
                        setFile(null);
                        setShowAddForm(false);
                    }}>Add</button>
                    <button className="btn btn-primary" onClick={(e) => {
                        e.preventDefault()
                        setShowAddForm(false);
                        setName("");
                        setFile(null);
                    }}>Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                {currentFiles && currentFiles.map((file, i) => {
                    return (
                        <div>
                            <p>{file.fileName}</p>
                        </div>
                    )
                })}
                {newFiles && newFiles.map((file, i) => {
                    return (
                        <div>
                            <p>{file.fileName} ({file.file.name})</p>
                        </div>
                    )
                })}
            </div>
            {content}
        </>
    )
}

export default FileUpload;