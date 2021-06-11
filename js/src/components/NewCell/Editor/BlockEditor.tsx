import React, { useEffect, useRef, useState } from 'react';
import Text from '../Blocks/Text';
import Video from '../Blocks/Video';
import File from '../Blocks/File';
import { Blocks, IBlock } from '../Cell';
import VideoForm from './VideoForm';
import TextForm from './TextForm';
import { transform } from 'typescript';

interface BlockEditorProps {
    index: number
    type: string
    data: any
    position: Position
    transformTop?: number
    moveTop?: number
    width?: number
    mouseDown: boolean,
    mousePosition: Position,
    handleLoad() : void
}

export interface Position {
    mouseX: number
    mouseY: number
    offsetX: number
    offsetY: number
}

interface BlockEditorFuncs {
    updateBlock(index: number, block: IBlock<Blocks>): void
    handleMouseDown(e: React.MouseEvent<HTMLElement>, i: number): void
    setRef(ref: React.MutableRefObject<HTMLElement>, index: number): void
    clearRef(ref: React.MutableRefObject<HTMLElement>, index: number)
}

const BlockEditor: React.FC<BlockEditorProps & IBlock<Blocks> & BlockEditorFuncs> = (props) => {
    const defaultStyle: React.CSSProperties = {
        cursor: "pointer"
    }

    const defaultWrapperStyle: React.CSSProperties = {
        position: "relative",
        top: "auto",
        left: "auto",
        paddingBottom: "2rem",
        transitionProperty: "transform"
    }

    const [initialTransform, setInitialTransform] = useState(null);
    const element = useRef<HTMLDivElement>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [block, setBlock] = useState<IBlock<Blocks>>();
    const [style, setStyle] = useState<React.CSSProperties>(defaultStyle);
    const [wrapperStyle, setWrapperStyle] = useState<React.CSSProperties>(defaultWrapperStyle);
    const [shouldUpdate, setShouldUpdate] = useState(false);

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
            ...props.data
        })
        setIsEdit(true)
    }

    useEffect(() => {
    }, [block])

    useEffect(() => {
        if (!initialTransform) {
            setInitialTransform(props.transformTop)
        }
        
        if (props.mouseDown && props.position) {
            setWrapperStyle({
                ...wrapperStyle,
                position: "fixed",
                userSelect: "none",
                top: `${props.position.mouseY - props.position.offsetY}px`,
                transform: "none",
                transitionDuration: "0s",
                zIndex: 100,
                opacity: 0.6
            })

            setStyle({
                ...style,
                width: `${element.current.offsetWidth}px`,
                height: `${element.current.offsetHeight}px`,
            })
        } else if (props.mouseDown) {
            setStyle({
                ...style,
                width: `${element.current.offsetWidth}px`,
                height: `${element.current.offsetHeight}px`,
                zIndex: 50
            })

            let initial = initialTransform ? initialTransform : props.transformTop;

            setWrapperStyle({
                ...wrapperStyle,
                position: "absolute",
                top: `${initial}px`,
                transform: `translateY(${props.transformTop - initial}px)`,
                transitionDuration: "0.2s"
            })
        } else {
            setStyle({
                ...defaultStyle
            })

            setWrapperStyle({
                ...defaultWrapperStyle,
                top: "0px"
            })
            
        }
        
    }, [props.position, props.mouseDown, props.mousePosition])

    useEffect(() => {
        setInitialTransform(props.transformTop);
    }, [props.mouseDown])

    function updateBlock(newBlock: IBlock<Blocks>) {
        setBlock(newBlock)
    }

    useEffect(() => {
        if (element) {
            props.setRef(element, props.index);
        }
    }, [element, props.data])

    let content = null;
    switch (props.type) {
        case "video":
            if (isEdit) {
                content = (
                    <VideoForm block={block as VideoBlock} setBlock={updateBlock} />
                )
            } else {
                content = (
                    <Video handleLoad={props.handleLoad} {...props.data} small={!isPreview} />
                )
            }
            break;

        case "text":
            if (isEdit) {
                content = (
                    <TextForm block={block} setBlock={updateBlock} />
                )
            } else if (isPreview) {
                content = (
                    <Text {...props.data} />
                )
            } else {
                content = (
                    <Text {...props.data} />
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
                    <File {...props.data} />
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
        <li className="card-wrapper" style={wrapperStyle}>
            <div className="main-card card" style={style} onMouseDown={(e) => {
                props.handleMouseDown(e, props.index);
            }} ref={element}>
                <div className="card-body">
                    {content}
                    <div className="btn-container">
                        {buttons}
                    </div>
                </div>
            </div>
        </li>
    )

}

export default BlockEditor;