import React, { useEffect, useRef, useState } from 'react';
import { IBlock, ICell } from '../Cell';
import EditWrapper from './EditWrapper';
import BlockEditor, { Position } from './BlockEditor';
import Placeholder, { PlaceholderProps } from './Placeholder';
import AddBlock, { AddBlockProps } from './AddBlock';
const cell = require("../../../cell.json") as ICell;

interface CellEditorProps {
    cellID: number
}

interface SelectedBlock {
    index: number
    top: number
}

interface BlockPosition {
    height: number
    index: number
    isPlaceholder: boolean
}



const CellEditor: React.FC<CellEditorProps> = (props) => {
    let defaultPosition: Position = {
        mouseX: -1,
        mouseY: -1,
        offsetX: -1,
        offsetY: -1
    }

    let defaultPlaceholder: PlaceholderProps = {
        height: 0,
        width: 0,
        top: 0,
        left: 0
    }

    let defaultSelected: SelectedBlock = {
        index: -1,
        top: 0
    }

    const [gap, setGap] = useState(0);
    const [blocks, setBlocks] = useState<(IBlock & any)[]>();
    const [selectedBlock, setSelectedBlock] = useState(defaultSelected);
    const [top, setTop] = useState(0);
    const [position, setPosition] = useState<Position>(defaultPosition);
    const [mouseDown, setMouseDown] = useState(false);
    const [newIndex, setNewIndex] = useState(-1);
    const [virtualBlocks, setVirtualBlocks] = useState<BlockPosition[]>([])

    const [placeholderPos, setPlaceholderPos] = useState(defaultPlaceholder);
    const [totalHeight, setTotalHeight] = useState(0);

    const [addBlockProps, setAddBlockProps] = useState<AddBlockProps>(null);
    const [showAddBlockMenu, setShowAddBlockMenu] = useState(false);

    const container = useRef(null);

    useEffect(() => {
        if (cell && cell.blocks) {
            setBlocks(cell.blocks);
        }
    }, [cell])

    function updateBlock(index: number, block: (IBlock & any)) {
        let currentBlock = { ...blocks[index], data: { ...block } };
        let blocksStart = blocks.slice(0, index);
        let blocksEnd = blocks.slice(index + 1, blocks.length);
        setBlocks([...blocksStart, currentBlock, ...blocksEnd]);
    }

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp)
        return () => {
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [blocks, virtualBlocks])

    function orderBlocks() {
        let newBlocks = blocks.map((b, i) => {
            let newIndex = -1;
            virtualBlocks.find((v, vi) => {
                if (v.index == i) {
                    newIndex = vi;
                    return true
                }
            })
            return {
                ...b,
                order: newIndex
            }
        })

        newBlocks = newBlocks.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            } else if (a.order < b.order) {
                return -1;
            } else {
                return 0;
            }
        })

        setBlocks(newBlocks);
    }

    function handleMouseUp(e: MouseEvent) {
        setMouseDown(false);
        setPosition(defaultPosition);
        setSelectedBlock({
            top: 0,
            index: -1
        });

        orderBlocks();
    }

    function handleMouseDown(e: React.MouseEvent<HTMLElement>, i: number) {
        e.preventDefault();
        if (e.button == 0) {
            setMouseDown(true);
            setPosition({
                ...position,
                offsetX: e.nativeEvent.offsetX,
                offsetY: e.nativeEvent.offsetY,
                mouseX: e.nativeEvent.clientX,
                mouseY: e.nativeEvent.clientY
            })

            let el = blocks[i]?.ref.current;
            let box = container.current.getBoundingClientRect();

            setPlaceholderPos({
                height: el?.offsetHeight,
                width: el?.offsetWidth,
                top: 0,
                left: el?.getBoundingClientRect().left - box.left
            })

            let currentBlocks = blocks;
            currentBlocks.forEach((block, index) => {
                block.transformTop = 0;
                let blockBox = block?.ref.current.getBoundingClientRect();
                block.transformTop = blockBox?.top - top;
            })
            setBlocks(currentBlocks);

            setSelectedBlock({
                top: box?.top,
                index: i
            });

            setNewIndex(i);

            createVirtualBlocks(i);
        }
    }

    useEffect(() => {
        if (blocks) {
            createVirtualBlocks(0)
        }
    }, [blocks])

    function createVirtualBlocks(index: number = 0) {
        let totalHeight = 0;
        let newVirtualBlocks: BlockPosition[] = []
        for (let i = 0; i < blocks.length; i++) {
            const b = blocks[i];

            let height = b.ref.current.parentElement.scrollHeight;
            totalHeight += height;
            let newBlock: BlockPosition = {
                height,
                index: i,
                isPlaceholder: index == i
            }
            newVirtualBlocks = [...newVirtualBlocks, newBlock];
        }

        console.log("Hello");

        setVirtualBlocks(newVirtualBlocks);
        setTotalHeight(totalHeight);
    }

    function updateMousePosition(ev: MouseEvent) {
        setPosition({
            ...position,
            mouseX: ev.clientX,
            mouseY: ev.clientY
        })


    }



    function setRef(ref: React.MutableRefObject<HTMLElement>, index: number) {
        let currentBlocks = blocks;
        currentBlocks[index].ref = ref;
        setBlocks(currentBlocks);
        if (index == 0) {
            setTop(ref.current.getBoundingClientRect().top);
        }
    }

    function clearRef(ref: React.MutableRefObject<HTMLElement>, index: number) {
        let currentBlocks = blocks;
        currentBlocks[index].ref = null;
        setBlocks(currentBlocks);
    }

    useEffect(() => {
        if (mouseDown) {
            window.addEventListener("mousemove", updateMousePosition);
            setAddBlockProps(null)
        } else {
            console.log(virtualBlocks)
            window.addEventListener("mousemove", handleMouseHover)
        }
        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
            window.removeEventListener("mousemove", handleMouseHover)
        }
    }, [mouseDown, virtualBlocks])

    function handleMouseHover(e: MouseEvent) {
        if (showAddBlockMenu) {
            return
        }

        if (!virtualBlocks) {
            setAddBlockProps(null);
            return
        }
        let containerBox = container.current.getBoundingClientRect();
        if (e.clientX < containerBox.left || e.clientX > containerBox.right) {
            setAddBlockProps(null);
            return
        }
        const mouseY = e.clientY - container.current.getBoundingClientRect().top;
        let hoveredBlock: BlockPosition;
        let currentTop = 0;
        for (let i = 0; i < virtualBlocks.length; i++) {
            const block = virtualBlocks[i];
            if (mouseY > currentTop && mouseY < currentTop + block.height) {
                hoveredBlock = block;
                break;
            }
            currentTop += block.height;
        }

        if (mouseY > -32 && mouseY < 0) {
            setAddBlockProps({
                top: -16
            })
            return
        }

        if (!hoveredBlock) {
            setAddBlockProps(null);
            return;
        }

        // Need to get height - paddingBottom

        let realBlock = blocks.find((b, i) => i == hoveredBlock.index);
        let realBlockParentStyle = window.getComputedStyle(realBlock.ref.current.parentElement);
        let paddingBottom = parseFloat(realBlockParentStyle.paddingBottom);
        let actualHeight = hoveredBlock.height - paddingBottom;

        if (mouseY > -paddingBottom && mouseY < (actualHeight/2)) {
            setAddBlockProps({
                top: -(paddingBottom / 2)
            })
            return
        }

        if (mouseY < currentTop + (actualHeight / 2)) {
            setAddBlockProps({
                top: currentTop - (paddingBottom / 2)
            })
        } else {
            setAddBlockProps({
                top: currentTop + hoveredBlock.height - (paddingBottom / 2)
            })
        }

    }

    function openAddBlockMenu() {
        setShowAddBlockMenu(true)
    }

    function closeAddBlockMenu() {
        setShowAddBlockMenu(false)
    }

    useEffect(() => {
        if (blocks) {
            let containerBox = container.current.getBoundingClientRect();
            let currentTop = containerBox.top;
            let placeholderIndex = -1;
            let placeholder = virtualBlocks.find((b, i) => {
                if (b.isPlaceholder) {
                    placeholderIndex = i;
                    return true;
                }
            });
            for (let i = 0; i < virtualBlocks.length; i++) {
                const block = virtualBlocks[i];
                let currentBottom = 0;
                let top = 0;
                const isPlaceholderLarger = block.height < placeholderPos.height;
                if (placeholderIndex < i) {
                    currentBottom = currentTop + block.height;
                    top = isPlaceholderLarger ? currentTop : currentBottom - placeholderPos.height;
                } else {
                    currentBottom = isPlaceholderLarger ? currentTop + block.height : currentTop + placeholderPos.height;
                    top = currentTop;
                }
                const isWithinBlock = position.mouseY > top && position.mouseY < currentBottom;
                if (isWithinBlock) {
                    if (!block.isPlaceholder) {
                        if (placeholderIndex < i) {
                            let beforePlaceholder = virtualBlocks.slice(0, placeholderIndex);
                            let afterPlaceholder = virtualBlocks.slice(placeholderIndex + 1, i + 1);
                            let afterCurrent = virtualBlocks.slice(i + 1, virtualBlocks.length);
                            setVirtualBlocks([...beforePlaceholder, ...afterPlaceholder, placeholder, ...afterCurrent]);
                        } else {
                            let beforeCurrent = virtualBlocks.slice(0, i);
                            let beforePlaceholder = virtualBlocks.slice(i, placeholderIndex);
                            let afterPlaceholder = virtualBlocks.slice(placeholderIndex + 1, blocks.length);
                            setVirtualBlocks([...beforeCurrent, placeholder, ...beforePlaceholder, ...afterPlaceholder]);
                        }
                    }
                }

                currentTop += block.height;
            }

        }
    }, [position.mouseY])

    useEffect(() => {
    }, [newIndex])

    useEffect(() => {
    }, [blocks])

    useEffect(() => {
    }, [virtualBlocks])

    let blocksRendered = blocks?.map((b, i) => {
        let isSelected = i == selectedBlock.index;

        let transformTop = 0;

        for (let index = 0; index < virtualBlocks.length; index++) {
            const v = virtualBlocks[index];
            if (v.index == i) {
                break;
            }
            transformTop += v.height;
        }

        return (
            <React.Fragment key={i}>
                <BlockEditor
                    index={i}
                    {...b}
                    position={isSelected && position}
                    updateBlock={updateBlock}
                    handleMouseDown={handleMouseDown}
                    setRef={setRef}
                    clearRef={clearRef}
                    transformTop={mouseDown ? transformTop : null}
                    mouseDown={mouseDown}
                    mousePosition={position}
                    handleLoad={createVirtualBlocks}
                />
                {isSelected && <Placeholder {...placeholderPos} top={transformTop} />}
            </React.Fragment>
        )
    })

    let height;
    for (let i = 0; i < virtualBlocks.length; i++) {
        const element = virtualBlocks[i];
        height += element.height;
    }

    return (
        <div className="row" ref={container} style={{ minHeight: `${totalHeight}px`, padding: "0 1rem 0 1rem" }}>
            <div className="c-block-container">
                {addBlockProps && <AddBlock {...addBlockProps} />}
                {blocksRendered}
            </div>
        </div>
    )
}

export default CellEditor;