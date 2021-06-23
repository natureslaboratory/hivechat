import { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';

interface FileUploadProps {
    addFile(file: TempFile): void
    deleteFile(index: number, type: string): void
    newFiles: TempFile[]
    currentFiles: CustomFile[]
}

export interface TempFile {
    file: File,
    fileName: string
}

export interface CustomFile {
    fileID: number
    fileLocation: string
    fileName: string
}

const FileUpload: React.FC<FileUploadProps> = ({ addFile, deleteFile, newFiles, currentFiles }) => {
    const ref = useRef<HTMLInputElement>();
    const [showAddForm, setShowAddForm] = useState(false);
    const [file, setFile] = useState<File>(null);
    const [name, setName] = useState("");

    function handleClick() {
        ref.current.click();
    }

    let content = (
        <>
            <div className="btn-container">
                <button className="btn btn-primary" onClick={(e) => {
                    setShowAddForm(true);
                }}>+ Add File</button>
            </div>
        </>
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
                        addFile({ file, fileName: name });
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
                {currentFiles.length > 0 && <div className="c-file-upload">
                    <label>Current Files</label>
                    {!(currentFiles.length > 0 || showAddForm) && <p style={{ opacity: "0.5", fontStyle: "italic" }}>No Files</p>}
                    {currentFiles && currentFiles.map((file, i) => {
                        return (
                            <div key={file.fileName + i} className="c-file-upload__file">
                                <p>{file.fileName}</p>
                                <button className="btn btn-outline-danger" onClick={(e) => {
                                    e.preventDefault();
                                    deleteFile(i, "current")
                                }}>Delete</button>
                            </div>
                        )
                    })}
                </div>}
                <div className="c-file-upload">
                    <label>New Files</label>

                    {newFiles.length > 0 ? newFiles.map((file, i) => {
                        return (
                            <div key={file.fileName + i} className="c-file-upload__file">
                                <p>{file.fileName} ({file.file.name})</p>
                                <button className="btn btn-outline-danger"onClick={(e) => {
                                    e.preventDefault();
                                    deleteFile(i, "new")
                                }}>Delete</button>
                            </div>
                        )
                    }) : <p style={{ opacity: "0.5", fontStyle: "italic" }}>No Files</p>}
                </div>
            </div>
            {content}
        </>
    )
}

export default FileUpload;