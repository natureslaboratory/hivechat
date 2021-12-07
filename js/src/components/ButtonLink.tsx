import React from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
    link: string,
    target: string,
    label: string,
    type: "primary" | "secondary" | "danger"
}

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
    return (
        <Link to={props.link} target={props.target}>
            <button type="button" className={`btn btn-${props.type} btn-sm`}>{props.label}</button>
        </Link>
    )
}

export default ButtonLink;