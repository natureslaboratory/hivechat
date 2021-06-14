import React, { useEffect, useRef, useState } from 'react';
import { Blocks, IBlock, ICell } from '../Cell';
import BlockEditor from './NewBlockEditor';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import AddBlock from './AddBlock';
const cell = require("../../../cell.json") as ICell;

interface CellEditorProps {
    cellID: number
}


const CellEditor: React.FC<CellEditorProps> = (props) => {

    const [blocks, setBlocks] = useState<IBlock<Blocks>[]>();
    const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout>(null);

    useEffect(() => {
        if (cell && cell.blocks) {
            updateBlocks(cell.blocks);
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

    function updateBlocks(blocks: IBlock<Blocks>[]) {
        setBlocks(orderBlocks(blocks));
    }

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

    function updateBlock(index: number, block: Blocks) {
        console.log(block);
        let newBlock = {...blocks[index], data: block}
        let blocksStart = blocks.slice(0, index);
        let blocksEnd = blocks.slice(index + 1, blocks.length);
        setBlocks([...blocksStart, newBlock, ...blocksEnd]);
    }

    function handleDrop(drop: DropResult, provided: ResponderProvided) {
        let newBlocks = blocks;
        const startBlock = blocks[drop.source.index];
        const destinationBlock = blocks[drop.destination.index];

        newBlocks[drop.source.index].order = newBlocks[drop.destination.index].order;
        if (drop.source.index < drop.destination.index) {
            for (let i = drop.source.index+1; i < drop.destination.index+1; i++) {
                newBlocks[i].order = blocks[i].order-1;
            }
        } else if (drop.source.index > drop.destination.index) {
            for (let i = drop.destination.index; i < drop.source.index; i++) {
                newBlocks[i].order = blocks[i].order+1;
            }
        }
        console.log(newBlocks);
        updateBlocks(newBlocks);
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

    function addBlock(block: IBlock<Blocks>) {
        setBlocks([...blocks, block])
    }

    console.log(blocks)

    return (
        <DragDropContext onDragEnd={handleDrop}>
            <div className="row" style={{ padding: "0 1rem 0 1rem"}}>
                <div className="col-md-6">
                    <Droppable droppableId={"id"} >
                        {(provided) => (
                            <ul className="c-block-container" style={{marginBottom: 0}} {...provided.droppableProps} ref={provided.innerRef}>
                                {blocks.map((b, i) => <BlockEditor updateBlock={updateBlock} block={b} index={i} key={b.id} />)}
                                {provided.placeholder}
                            </ul>
                        )
                        }
                    </Droppable>
                    <AddBlock newID={createID()} order={blocks[blocks.length-1].order+1} addBlock={addBlock} />
                </div>
            </div>
        </DragDropContext>
    )
}

export default CellEditor;