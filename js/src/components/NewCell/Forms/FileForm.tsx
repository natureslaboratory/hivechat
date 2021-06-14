import React, { useEffect, useState } from 'react';
import { IBlock } from '../Cell';
import RichTextEditor from 'react-rte';

interface FileFormProps {
    block : FileBlock
}

export interface FileBlock {
    url : string
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

    if (block) {
        return (
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" value={block.title} onChange={(e) => setBlock({...block, title: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Url</label>
                    <input className="form-control" type="text" value={block.url} onChange={(e) => setBlock({...block, url: e.target.value})} />
                </div>
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