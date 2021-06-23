import React from 'react';

interface BackProps {
    label : string,
    link? : string,
    goBack(e : React.MouseEvent<HTMLElement>) : void
}

const Back : React.FunctionComponent<BackProps> = (props) => {
    if (props.link) {
        return (
            <a href={props.link}>
                <button className="btn btn-outline-primary mb-4">{props.label}</button>
            </a>
        )
    } else {
        <button className="btn btn-outline-primary mb-4" onClick={props.goBack}>{props.label}</button>
    }
}

export default Back;