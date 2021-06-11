import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Text from '../Blocks/Text';
import Video from '../Blocks/Video';
import File from '../Blocks/File';
import { Blocks, IBlock } from '../Cell';
import VideoForm, { VideoBlock } from './VideoForm';
import TextForm, { TextBlock } from './TextForm';
import { Draggable } from 'react-beautiful-dnd'
import Container from './Container';
import { FileBlock } from './FileForm';

interface BlockEditorProps {
    index: number
}

interface BlockEditorFuncs {
    updateBlock(index: number, block: IBlock<Blocks>): void
}

const BlockEditor: React.FC<BlockEditorProps & IBlock<Blocks> & BlockEditorFuncs> = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [block, setBlock] = useState<IBlock<Blocks>>();

    function save() {
        props.updateBlock(props.index, block);
        cancel();
    }

    function cancel() {
        setBlock(null);
        setIsEdit(false);
    }

    function edit() {
        setBlock({
            ...block,
            data: {
                ...props.data
            }
        })
        setIsEdit(true)
    }

    function updateBlock(blockData: Blocks) {
        setBlock({...block, data: blockData})
    }

    let content = null;
    switch (props.type) {
        case "video":
            if (isEdit) {
                content = (
                    <VideoForm block={block.data as VideoBlock} setBlock={updateBlock} />
                )
            } else {
                content = (
                    <Video handleLoad={() => console.log("load")} {...props.data as VideoBlock} small={!isPreview} />
                )
            }
            break;

        case "text":
            if (isEdit) {
                content = (
                    <TextForm block={block.data as TextBlock} setBlock={updateBlock} />
                )
            } else if (isPreview) {
                content = (
                    <Text {...props.data as TextBlock} />
                )
            } else {
                content = (
                    <Text {...props.data as TextBlock} />
                )
            }
            break;
        case "file":
            if (isEdit) {
                content = (
                    <div>Not Yet Implemented</div>
                )
            } else {
                content = (
                    <File {...props.data as FileBlock} />
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

    if (isPreview) {
        buttons = (
            <button className="btn btn-alternate" onClick={() => setIsPreview(false)}>Back</button>
        )
    } else if (isEdit) {
        buttons = (
            <>
                <button className="btn btn-primary" onClick={() => save()}>Save</button>
                <button className="btn btn-secondary" onClick={() => cancel()}>Cancel</button>
                <button className="btn btn-danger">Delete</button>
            </>
        )
    }

    return (
        <Draggable draggableId={"hello" + props.id.toString()} index={props.index} >
            {(provided) => (
                <li {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    key={props.id.toString()}
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