import React from 'react';

interface ButtonProps {
    label: ButtonType
    handleClick(type: ButtonType) : void
}

export type ButtonType = "Text" | "Video" | "File" | "Question";

const AddBlockButton: React.FC<ButtonProps> = ({label, handleClick}) => {
    return <button className="btn btn-alternate" onClick={() => handleClick(label)}>{label}</button>
}
export default AddBlockButton;