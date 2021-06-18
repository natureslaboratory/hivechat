import React, { useEffect, useState } from 'react';
import { Blocks, IBlock } from '../Cell';

interface VideoFormProps {
    block : VideoBlock
}

export interface VideoBlock {
    title? : string
    url : string
    description : string
}

interface VideoFormFuncs {
    setBlock(block : Blocks) : void
}

const VideoForm : React.FC<VideoFormProps & VideoFormFuncs> = ({block, setBlock}) => {
    return (
        <form>
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="text" value={block.title} onChange={(e) => setBlock({...block, title: e.target.value})} />
            </div>
            <div className="form-group">
                <label>URL</label>
                <input className="form-control" type="text" value={block.url} onChange={(e) => setBlock({...block, url: e.target.value})} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={block.description} onChange={(e) => setBlock({...block, description: e.target.value})} />
            </div>
        </form>
    )
}

export default VideoForm;