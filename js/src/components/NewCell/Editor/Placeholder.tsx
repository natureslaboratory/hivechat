import React from 'react';

export interface PlaceholderProps {
    height : number,
    width: number
    top: number
    left: number
}

const Placeholder: React.FC<PlaceholderProps> = ({height, width, top, left}) => {
    return (
        <div style={{
            height: `${height}px`,
            width: `${width}px`,
            top: `${top}px`,
            left: `${0}px`
        }} 
        className="c-placeholder"/>
    )
}

export default Placeholder;