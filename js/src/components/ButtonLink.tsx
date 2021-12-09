import React from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
    to: string,
    target?: string,
    label: string,
    type: "primary" | "secondary" | "danger"
    size?: "small"
    outline?: boolean
}

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
    let buttonSize = props.size ? "btn-sm" : "";
    let outline = props.outline ? "outline-" : "";

    return (
        <Link to={props.to} target={props.target}>
            <button type="button" className={`btn btn-${outline}${props.type} ${buttonSize}`}>{props.label}</button>
        </Link>
    )
}

export const ButtonPageNavContainer: React.FC = (props) => <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1.5rem"}}>{props.children}</div>

export default ButtonLink;