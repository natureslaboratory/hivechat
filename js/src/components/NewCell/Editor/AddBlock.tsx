import React, { useState } from 'react';
import { updateBlock } from 'typescript';
import { Blocks, IBlock } from '../Cell';
import Button, { ButtonType } from './AddBlockButton';
import VideoForm, { VideoBlock } from './VideoForm';

export interface AddBlockProps {
}

interface AddBlockFuncs {
}


const AddBlock: React.FC<AddBlockProps & AddBlockFuncs> = (props) => {
    const [blockType, setBlockType] = useState<ButtonType>(null);
    const [block, setBlock] = useState<IBlock<Blocks>>(null);

    const buttonTypes: ButtonType[] = ["Text", "Video", "File"];

    function handleClick(type: ButtonType) {
        switch(type) {
            case "Video":
                let data: VideoBlock = {
                    url: "",
                    title: "",
                    description: ""
                } 
                setBlock({
                    type: "",
                    order: 0,
                    id: null,
                    data
                })
                break;
            case "Text":
                console.log("text");
                break;
            case "File":
                console.log("file");
                break;
            default:
                console.error("Default")
        }
    }

    function updateBlock(block: IBlock<Blocks>) {
        
    }

    if (blockType) {
        switch (blockType) {
            case "Video":
                return <VideoForm block={block.data as VideoBlock} setBlock={null} />
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="c-add-block__buttons">
                    {buttonTypes.map((b, i) => <Button handleClick={handleClick} label={b}></Button>)}
                </div>
            </div>
        </div>
    )
}

export default AddBlock;

