import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Text from '../Blocks/Text';
import Video from '../Blocks/Video';
import File from '../Blocks/File';
import { Blocks, IBlock } from '../Cell';
import VideoForm, { VideoBlock } from '../Forms/VideoForm';
import TextForm, { TextBlock } from '../Forms/TextForm';
import { Draggable } from 'react-beautiful-dnd'
import Container from './Container';
import FileForm, { FileBlock } from '../Forms/FileForm';

interface BlockEditorProps {
    index: number
    block: IBlock<Blocks>
}

interface BlockEditorFuncs {
    updateBlock(index: number, block: Blocks): Promise<void>
    deleteBlock(index: number): Promise<void>
}

const BlockEditor: React.FC<BlockEditorProps & BlockEditorFuncs> = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [block, setBlock] = useState<Blocks>();
    const [showDelete, setShowDelete] = useState(false);

    async function save() {
        await props.updateBlock(props.index, block);
        cancel();
    }

    function cancel() {
        setBlock(null);
        setIsEdit(false);
    }

    function edit() {
        setBlock({
            ...props.block.blockData
        })
        setIsEdit(true)
    }

    function updateBlock(blockData: Blocks) {
        setBlock(blockData)
    }

    let content = null;
    switch (props.block.blockType) {
        case "Video":
            if (isEdit) {
                content = (
                    <VideoForm block={block as VideoBlock} setBlock={updateBlock} />
                )
            } else {
                content = (
                    <Video handleLoad={() => console.log("load")} {...props.block.blockData as VideoBlock} small={!isPreview} />
                )
            }
            break;

        case "Text":
            if (isEdit) {
                content = (
                    <TextForm block={block as TextBlock} setBlock={updateBlock} />
                )
            } else {
                content = (
                    <Text {...props.block.blockData as TextBlock} small={!isPreview} />
                )
            }
            break;
        case "File":
            if (isEdit) {
                content = (
                    <FileForm block={block as FileBlock} setBlock={updateBlock} />
                )
            } else {
                content = (
                    <File {...props.block.blockData as FileBlock} />
                )
            }
            break;
        default:
            content = null;
    }

    let buttons = (
        <>
            <button className="btn btn-alternate" onClick={() => setIsPreview(true)}>Preview</button>
            <button className="btn btn-primary" onClick={() => edit()}>Edit</button>
        </>
    )

    if (isEdit && showDelete) {
        buttons = (
            <>
                <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => props.deleteBlock(props.index)}>Confirm Delete</button>
            </>
           
        )

    } else if (isPreview) {
        buttons = (
            <button className="btn btn-alternate" onClick={() => setIsPreview(false)}>Back</button>
        )
    } else if (isEdit) {
        buttons = (
            <>
                <button className="btn btn-primary" onClick={() => save()}>Save</button>
                <button className="btn btn-secondary" onClick={() => cancel()}>Cancel</button>
                <button className="btn btn-danger" onClick={() => setShowDelete(true)}>Delete</button>
            </>
        )
    }
    
    let id = props.block.blockID != (null || undefined) ? props.block.blockID : props.block.tempID;

    return (
        <Draggable draggableId={"block_"+ id.toString()} index={props.index} >
            {(provided) => (
                <li {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    key={id.toString()}
                    className="card-wrapper"
                >
                    <div className="main-card card">
                        <div className="card-body">
                            {content}
                            <div className="btn-container">
                                {buttons}
                            </div>
                        </div>
                    </div>
                </li>
            )}
        </Draggable>
    )

}

export default BlockEditor;