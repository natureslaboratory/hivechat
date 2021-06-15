import React, { useEffect, useRef, useState } from 'react';
import { Blocks, IBlock, ICell } from '../Cell';
import BlockEditor from './NewBlockEditor';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import AddBlock from './AddBlock';
import axios from 'axios';
import { CellDetails } from './CreateCell';
import EditCellDetails from './EditCellDetails';

export interface CellEditorProps {
    cellID: number
    hiveID: number
}

interface CellEditorFuncs {
    getCells() : void
}


const CellEditor: React.FC<CellEditorProps & CellEditorFuncs> = (props) => {

    const [blocks, setBlocks] = useState<IBlock<Blocks>[]>([]);
    const [cell, setCell] = useState<CellDetails>(null);
    const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout>(null);

    useEffect(() => {
        getCell();
    }, []);

    function getCell() {
        let url = "/page-api/cell/get?cellID=" + props.cellID;
        axios.get(url).then(res => {
            console.log(res.data);
            if (res.data) { 
                console.log(res.data);
                let newBlocks = res.data.blocks.map((b) => {
                    let newBlocks = {...b};
                    if (b.blockData) {
                        newBlocks.blockData = JSON.parse(b.blockData)
                    }
                    return newBlocks;
                }) as IBlock<Blocks>[];

                updateBlocks(newBlocks);
                let date = res.data.cellDate.split(" ");
                setCell({
                    cellTitle: res.data.cellTitle,
                    cellSubtitle: res.data.cellSubtitle,
                    cellTime: date[1],
                    cellDate: date[0],
                    cellID: res.data.cellID
                })
            }
        }).catch(err => {
            console.error(err);
        })
    }

    function updateBlocks(blocks: IBlock<Blocks>[]) {
        if (!blocks) {
            return;
        }
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }
        setSaveTimeout(global.setTimeout(async () => {
            let data = new FormData();
            data.append("blocks", JSON.stringify(blocks));

            clearTimeout(saveTimeout)
        }, 100));
        setBlocks(orderBlocks(blocks));
    }

    function orderBlocks(blocks: (IBlock<Blocks>)[]) {
        return blocks.sort((a, b) => {
            if (a.blockOrder > b.blockOrder) {
                return 1;
            } else if (a.blockOrder < b.blockOrder) {
                return -1;
            } else {
                return 0;
            }
        })
    }

    function updateBlock(index: number, block: Blocks) {
        console.log(block);
        let newBlock = { ...blocks[index], blockData: block }

        let data = new FormData();
        data.append("blockID", newBlock.blockID.toString());
        data.append("blockData", JSON.stringify(newBlock.blockData));

        return axios.post("/page-api/block/update", data)
            .then(res => {
                console.log(res)
                getCell();
            })
    }

    function updateCell(e: React.MouseEvent<HTMLButtonElement>, newCell: CellDetails) {
        e.preventDefault();
        let data = new FormData();

        data.append("cellID", cell.cellID);
        data.append("cellTitle", newCell.cellTitle);
        data.append("cellSubtitle", newCell.cellSubtitle);
        data.append("cellDate", `${newCell.cellDate} ${newCell.cellTime}`);

        axios.post("/page-api/cell/update", data)
            .then(res => {
                console.log(res);
                getCell();
                props.getCells();
            })

    }

    function deleteBlock(index: number) {
        let data = new FormData();
        data.append("blockID", blocks[index].blockID.toString());

        return axios.post("/page-api/block/delete", data)
            .then(res => {
                console.log(res.data);
                getCell();
            }) 
    }

    async function handleDrop(drop: DropResult, provided: ResponderProvided) {
        let newBlocks = blocks;

        newBlocks[drop.source.index].blockOrder = newBlocks[drop.destination.index].blockOrder;
        if (drop.source.index < drop.destination.index) {
            for (let i = drop.source.index + 1; i < drop.destination.index + 1; i++) {
                newBlocks[i].blockOrder = blocks[i].blockOrder - 1;
            }
        } else if (drop.source.index > drop.destination.index) {
            for (let i = drop.destination.index; i < drop.source.index; i++) {
                newBlocks[i].blockOrder = blocks[i].blockOrder + 1;
            }
        }

        updateBlocks(newBlocks);

        let data = new FormData();
        data.append("blocks", JSON.stringify(newBlocks));
        axios.post("/page-api/block/update-bulk", data)
            .then(res => {
                console.log(res);
                getCell();
            })
    }

    function createID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    function addBlock(block: IBlock<Blocks>) {
        let data = new FormData();

        let order = (blocks.length > 0 ? blocks[blocks.length-1].blockOrder+1 : 0).toString();
        data.append("blockType", block.blockType);
        data.append("cellID", props.cellID.toString());
        data.append("blockData", JSON.stringify(block.blockData));
        data.append("blockOrder", order);

        axios.post("/page-api/block/create", data)
            .then(res => {
                console.log(res)
                getCell();
            });
    }

    return (
        <div className="row">
            <div className="col-md-6">
                {cell && <EditCellDetails cell={cell} updateCell={updateCell} />}
            </div>
            <DragDropContext onDragEnd={handleDrop}>
                <div className="col-md-6">
                    <Droppable droppableId={"id"} >
                        {(provided) => (
                            <ul className="c-block-container" style={{ marginBottom: 0 }} {...provided.droppableProps} ref={provided.innerRef}>
                                {blocks.map((b, i) => <BlockEditor deleteBlock={deleteBlock} updateBlock={updateBlock} block={b} index={i} key={b.blockID} />)}
                                {provided.placeholder}
                            </ul>
                        )
                        }
                    </Droppable>
                    {<AddBlock newID={createID()} blockOrder={blocks.length > 0 ? blocks[blocks.length - 1].blockOrder + 1 : 0} addBlock={addBlock} />}
                </div>
            </DragDropContext>
        </div>
    )
}

export default CellEditor;