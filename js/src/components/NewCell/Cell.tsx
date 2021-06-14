import React, { useEffect, useState } from 'react';
import { formatDate } from '../../helpers';
import Video from './Blocks/Video';
import Text from './Blocks/Text';
import File from './Blocks/File';
import Block from './Block';
import { VideoBlock } from './Forms/VideoForm';
import { TextBlock } from './Forms/TextForm';
import { FileBlock } from './Forms/FileForm';
const cell = require("../../cell.json") as ICell;


interface CellProps {
    hiveID: number,
    cellID: number
}

export interface ICell {
    title: string,
    subtitle?: string,
    datetime: string,
    blocks: IBlock<Blocks>[]
}

export interface IBlock<T> {
    type: string
    order: number
    id?: number
    tempID?: number
    data: T
}


export type Blocks = VideoBlock | TextBlock | FileBlock;

const Cell: React.FC<CellProps> = (props) => {
    const [blocks, setBlocks] = useState<IBlock<Blocks>[]>();

    useEffect(() => {
        if (cell && cell.blocks) {
            setBlocks(cell.blocks);
        }
    }, [cell])

    function getBlock(block: IBlock<Blocks>) {
        switch (block.type) {
            case "Video":
                return <Video {...block.data as VideoBlock} handleLoad={null} />
            case "Text":
                return <Text {...block.data as TextBlock} />;
            case "File":
                return <File {...block.data as FileBlock} />;
            default:
                return null
        }
    }

    // Dummy data

    let dateStr = "";
    if (cell.datetime !== "2000-01-01 00:00:00") {
        let date = new Date(cell.datetime);
        dateStr = formatDate(date);
    }

    return (
        <>
            <h1 style={{ marginBottom: cell.subtitle ? "0.3rem" : "1.3rem" }}>{cell.title}</h1>
            <div style={{ marginBottom: "1.3rem", opacity: 0.85 }}>
                {cell.subtitle && <h4>{cell.subtitle}</h4>}
                {dateStr ? <h6>{dateStr}</h6> : null}
            </div>
            {blocks && blocks.map(b => {
                let title = "";
                switch (b.type) {
                    case "Video":
                        title = (b.data as VideoBlock).title;
                        break;
                    case "Text":
                        title = "";
                        break;
                    case "File":
                        title = (b.data as FileBlock).title;
                        break;
                    default:
                        title = "";
                        break
                } 
                return (
                    <Block title={title}>
                        {getBlock(b)}
                    </Block>
                )
            })
            }
        </>
    )
}

export default Cell;