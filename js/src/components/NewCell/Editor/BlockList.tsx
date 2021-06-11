import React from 'react';

interface BlockListProps {
    children: React.ReactNode
}

const BlockList = React.forwardRef<HTMLUListElement, BlockListProps>((props, ref) => (
    <ul className="c-block-container" ref={ref}>
        {props.children}
    </ul>
))

export default BlockList;