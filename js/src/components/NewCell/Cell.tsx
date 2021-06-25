import React, { useEffect, useState } from 'react';
import { formatDate } from '../../helpers';
import Video from './Blocks/Video';
import Text from './Blocks/Text';
import File from './Blocks/File';
import Block from './Block';
import { VideoBlock } from './Forms/VideoForm';
import { TextBlock } from './Forms/TextForm';
import { FileBlock } from './Forms/FileForm';
import axios from 'axios';
import Question, { QuestionBlock } from './Blocks/Question';


interface CellProps {
    hiveID: number
    cell: ICell
}

export interface ICell {
    cellID: number
    cellTitle: string,
    cellSubtitle?: string,
    cellDate: string,
    cellOrder: number
    blocks?: IBlock<Blocks>[]
}

export interface IBlock<T> {
    blockType: string
    cellID?: number
    blockOrder: number
    blockID?: number
    tempID?: number
    blockData: T
}


export type Blocks = VideoBlock | TextBlock | FileBlock | QuestionBlock;

const Cell: React.FC<CellProps> = ({hiveID, cell}) => {
    const [blocks, setBlocks] = useState<IBlock<Blocks>[]>();

    useEffect(() => {
        if (cell && cell.cellID) {
            axios.get("/page-api/cell/get?cellID=" + cell.cellID)
                .then(res => {
                    let newBlocks: IBlock<Blocks>[] = res.data.blocks.map((b, i) => {
                        let newBlock = {...b};
                        newBlock.blockData = JSON.parse(newBlock.blockData);
                        return newBlock as IBlock<Blocks>;
                    })
                    setBlocks(newBlocks)
                })
        }
    }, [cell])

    function getBlock(block: IBlock<Blocks>) {
        switch (block.blockType) {
            case "Video":
                return <Video {...block.blockData as VideoBlock} handleLoad={null} />
            case "Text":
                return <Text {...block.blockData as TextBlock} />;
            case "File":
                return <File {...block.blockData as FileBlock} />;
            case "Question":
                return <Question preview={true} {...block as IBlock<QuestionBlock>} />
            default:
                return null
        }
    }

    // // Dummy data

    
    if (cell) {
        let dateStr = "";
        if (cell.cellDate) {
            console.log(cell.cellDate);
            let date = new Date(cell.cellDate);
            if (date) {
                dateStr = formatDate(date);
            }
        }
        return (
            <>
                <h1 style={{ marginBottom: cell.cellSubtitle ? "0.3rem" : "1.3rem" }}>{cell.cellTitle}</h1>
                <div style={{ marginBottom: "1.3rem", opacity: 0.85 }}>
                    {cell.cellSubtitle && <h4>{cell.cellSubtitle}</h4>}
                    {dateStr ? <h6>{dateStr}</h6> : null}
                </div>
                {blocks && blocks.map((b, i) => {
                    let title = "";
                    switch (b.blockType) {
                        case "Video":
                            title = (b.blockData as VideoBlock).title;
                            break;
                        case "Text":
                            title = "";
                            break;
                        case "File":
                            title = (b.blockData as FileBlock).title;
                            break;
                        default:
                            title = "";
                            break
                    } 
                    return (
                        <Block title={title} key={i}>
                            {getBlock(b)}
                        </Block>
                    )
                })
                }
            </>
        )
    }

    return <h1>Hello</h1>
}

export default Cell;