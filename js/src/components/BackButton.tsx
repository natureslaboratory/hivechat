import React from 'react';
import { Link } from 'react-router-dom';

type BackButtonProps = {
    link: string
    label: string
}

const BackButton: React.FC<BackButtonProps> = (props) => {
    return (
        <Link to={props.link}>
            <button className="c-button--back btn btn-outline-primary mb-4">{props.label}</button>
        </Link>
    )
}

export default BackButton;