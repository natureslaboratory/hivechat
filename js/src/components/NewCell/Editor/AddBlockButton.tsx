import React from 'react';

interface ButtonProps {
    label: ButtonType
    handleClick(type: ButtonType) : void
}

export type ButtonType = "Text" | "Video" | "File";

const AddBlockButton: React.FC<ButtonProps> = ({label, handleClick}) => {
    return <button onClick={() => handleClick(label)}>{label}</button>
}
export default AddBlockButton;