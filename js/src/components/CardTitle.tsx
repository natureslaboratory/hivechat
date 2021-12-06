import React from 'react';

const CardTitle: React.FC<{ title: string, titleStyle: React.CSSProperties }> = ({ title, titleStyle }) => {
    return <h5 style={titleStyle} className="card-title">{title}</h5>
}

export default CardTitle;