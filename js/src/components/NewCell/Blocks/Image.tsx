import React from 'react';

interface ImageProps {
    url: string,
    height?: number,
    width?: number,
    alt: string
    handleLoad(): void
}

const Image = React.memo((props: ImageProps) => {
    return (
        <img onLoad={props.handleLoad} src={props.url} width={props.width} style={{aspectRatio: `${props.width} / ${props.height}`}} alt={props.alt} />
    )
})

export default Image;