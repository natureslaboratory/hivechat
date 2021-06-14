import React, { useState } from 'react';
import { updateBlock } from 'typescript';
import { Blocks, IBlock } from '../Cell';
import Button, { ButtonType } from './AddBlockButton';
import FileForm, { FileBlock } from '../Forms/FileForm';
import TextForm, { TextBlock } from '../Forms/TextForm';
import VideoForm, { VideoBlock } from '../Forms/VideoForm';

export interface AddBlockProps {
    order: number
    newID: string
}

interface AddBlockFuncs {
    addBlock(block: IBlock<Blocks>) : void
}


const AddBlock: React.FC<AddBlockProps & AddBlockFuncs> = (props) => {
    const [blockType, setBlockType] = useState<ButtonType>(null);
    const [block, setBlock] = useState<IBlock<Blocks>>(null);

    const buttonTypes: ButtonType[] = ["Text", "Video", "File"];

    function handleClick(type: ButtonType) {
        switch(type) {
            case "Video":
                let videoData: VideoBlock = {
                    url: "",
                    title: "",
                    description: ""
                } 
                createBlock(type, videoData)
                break;
            case "Text":
                let textData: TextBlock = {
                    content: ""
                }
                createBlock(type, textData)
                break;
            case "File":
                let fileData: FileBlock = {
                    title: "",
                    url: "",
                    description: ""
                }
                createBlock(type, fileData)
                break;
            default:
                console.error("Default")
        }
    }

    function createBlock(type: ButtonType, data: Blocks) {
        setBlock({
            type,
            order: props.order,
            tempID: Math.random(),
            data
        })
    }


    function addBlock() {
        props.addBlock(block);
        setBlock(null);
    }

    function updateBlock(data: Blocks) {
        setBlock({
            ...block,
            data
        })
    }

    let content = <div />;
    let buttons: React.ReactNode = null;

    if (block) {
        switch (block.type) {
            case "Video":
                content =  <VideoForm block={block.data as VideoBlock} setBlock={updateBlock} />
                break;
            case "Text":
                content = <TextForm block={block.data as TextBlock} setBlock={updateBlock} />
                break;
            case "File":
                content = <FileForm block={block.data as FileBlock} setBlock={updateBlock} />
                break;
            default:
                console.error("No Block")
        }

        buttons = (
            <>
                <button className="btn btn-primary" onClick={addBlock}>Add</button>
                <button className="btn btn-secondary" onClick={() => setBlock(null)}>Cancel</button>
            </>
        )
    } else {
        content = (
            <>
            <h6>Add New Block</h6>
            <div className="c-add-block__buttons">
                {buttonTypes.map((b, i) => <Button key={b} handleClick={handleClick} label={b}></Button>)}
            </div>
            </>
        )
    }

    return (
        <div className="card" style={{marginBottom: "2rem"}}>
            <div className="card-body">
                {content}
                {buttons && (
                    <div className="btn-container">
                        {buttons}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddBlock;

