import React, { useEffect, useState } from 'react';
import { Blocks, IBlock } from '../Cell';
import RichTextEditor from 'react-rte';

interface TextFormProps {
    block: TextBlock
}

export interface TextBlock {
    content: string
}

interface TextFormFuncs {
    setBlock(block: Blocks): void
}

const TextForm: React.FC<TextFormProps & TextFormFuncs> = ({ block, setBlock }) => {
    const [editorValue, setEditorValue] = useState<any>(RichTextEditor.createEmptyValue());

    useEffect(() => {
        if (block.content) {
            setEditorValue(RichTextEditor.createValueFromString(block.content, 'html'))
        }
    }, [])

    useEffect(() => {
        if (editorValue) {
            setBlock({ ...block, content: editorValue.toString("html") })
        }
    }, [editorValue])

    if (block) {
        return (
            <form>
                <div className="form-group" style={{ minHeight: "300px" }}>
                    <label>Content</label>
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

export default TextForm;