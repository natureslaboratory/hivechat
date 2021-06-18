import React, { useEffect, useState } from 'react';
import { IBlock } from '../Cell';
import RichTextEditor from 'react-rte';
import FileUpload, { CustomFile, TempFile } from './FileUpload';
import axios from 'axios';

interface FileFormProps {
    block : FileBlock
}

export interface FileBlock {
    currentFiles: CustomFile[]
    newFiles: TempFile[]
    description : string
    title? : string
}

interface FileFormFuncs {
    setBlock(block: FileBlock) : void
}

const FileForm : React.FC<FileFormProps & FileFormFuncs> = ({block, setBlock}) => {
    const [editorValue, setEditorValue] = useState<any>(RichTextEditor.createEmptyValue());

    useEffect(() => {
        if (block.description) {
            setEditorValue(RichTextEditor.createValueFromString(block.description, 'html'))
        }
    }, [])

    useEffect(() => {
        if (editorValue) {
            setBlock({...block, description: editorValue.toString("html")})
        }
    }, [editorValue]) 

    function getFiles() {
        //
    }

    if (block) {
        return (
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" value={block.title} onChange={(e) => setBlock({...block, title: e.target.value})} />
                </div>
                <FileUpload newFiles={block.newFiles} currentFiles={block.currentFiles} addFile={(file: TempFile) => {
                    setBlock({
                        ...block,
                        newFiles: [...block.newFiles, file]
                    })
                }} />
                <div className="form-group" style={{ minHeight: "300px" }}>
                    <label>Description</label>
                    <RichTextEditor
                        value={editorValue}
                        onChange={(e) => {
                            setEditorValue(e);
                        }}
                    />
                </div>
            </form>
        )
    }
    return null

}

export default FileForm;