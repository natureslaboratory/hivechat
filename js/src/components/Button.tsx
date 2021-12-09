import React from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
    label: string,
    type: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "focus" | "alternate" | "light" | "dark" | "link"
    size?: "small"
    outline?: boolean
    disabled?: boolean
    style?: React.CSSProperties
    onClick?: {(e: React.MouseEvent)}
}

const Button: React.FC<ButtonProps> = (props) => {
    let buttonSize = props.size ? "btn-sm" : "";
    let outline = props.outline ? "outline-" : "";

    return (
        <button style={props.style} type="button" className={`btn btn-${outline}${props.type} ${buttonSize}`} onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
    )
}

export default Button;