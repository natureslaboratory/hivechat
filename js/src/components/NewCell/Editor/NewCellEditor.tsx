import React, { useEffect, useRef, useState } from 'react';
import { Blocks, IBlock, ICell } from '../Cell';
import BlockEditor from './NewBlockEditor';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import BlockList from './BlockList';
import MenuItem from './MenuItem';
import AddBlock from './AddBlock';
import { VideoBlock } from './VideoForm';
import { TextBlock } from './TextForm';
import { FileBlock } from './FileForm';
const cell = require("../../../cell.json") as ICell;

interface CellEditorProps {
    cellID: number
}


const CellEditor: React.FC<CellEditorProps> = (props) => {

    const [blocks, setBlocks] = useState<IBlock<Blocks>[]>();
    const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout>(null);

    useEffect(() => {
        if (cell && cell.blocks) {
            setBlocks(orderBlocks(cell.blocks));
        }
    }, [cell])

    useEffect(() => {
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }
        setSaveTimeout(global.setTimeout(() => {
            console.log("save")
        }, 3000));
    }, [blocks])

    function orderBlocks(blocks: (IBlock<Blocks>)[]) {
        return blocks.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            } else if (a.order < b.order) {
                return -1;
            } else {
                return 0;
            }
        })
    }

    function updateBlock(index: number, block: IBlock<Blocks>) {
        let currentBlock = { ...blocks[index], data: { ...block } };
        let blocksStart = blocks.slice(0, index);
        let blocksEnd = blocks.slice(index + 1, blocks.length);
        // setBlocks([...blocksStart, currentBlock, ...blocksEnd]);
    }

    function handleDrop(drop: DropResult, provided: ResponderProvided) {
        if (!drop.destination || drop.destination.index == drop.source.index) {
            return;
        }
        if (drop.source.index < drop.destination.index) {
            let beforeCurrent = blocks.slice(0, drop.source.index);
            let beforeNew = blocks.slice(drop.source.index + 1, drop.destination.index + 1);
            let afterNew = blocks.slice(drop.destination.index + 1, blocks.length);
            setBlocks([...beforeCurrent, ...beforeNew, blocks[drop.source.index], ...afterNew]);
        } else {
            let beforeCurrent = blocks.slice(0, drop.destination.index);
            let beforeOld = blocks.slice(drop.destination.index, drop.source.index);
            let afterOld = blocks.slice(drop.source.index + 1, blocks.length);
            setBlocks([...beforeCurrent, blocks[drop.source.index], ...beforeOld, ...afterOld]);
        }
    }

    if (!blocks) {
        return <div />
    }

    let menuItems = [
        {
            type: "video",
            id: createID()
        },
        {
            type: "text",
            id: createID()
        },
        {
            type: "file",
            id: createID()
        }
    ]

    function createID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    console.log(blocks)

    return (
        <DragDropContext onDragEnd={handleDrop}>
            <div className="row" style={{ padding: "0 1rem 0 1rem" }}>
                <div className="col-md-6">
                    <Droppable droppableId={"id"} >
                        {(provided) => (
                            <ul className="c-block-container" {...provided.droppableProps} ref={provided.innerRef}>
                                {blocks.map((b, i) => <BlockEditor updateBlock={updateBlock} {...b} index={i} key={b.id} />)}
                                {provided.placeholder}
                            </ul>
                        )
                        }
                    </Droppable>
                    <AddBlock />
                </div>
            </div>
        </DragDropContext>
    )
}

export default CellEditor;