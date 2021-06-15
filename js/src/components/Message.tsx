import React from 'react';

export interface MessageProps {
    message: string,
    link?: string,
    type: "Default" | "Success" | "Warning" | "Danger"
}

const Message: React.FC<MessageProps> = (props) => {
    let style: React.CSSProperties = {
        width: "100%",
        padding: "0.5rem"
    }

    switch(props.type) {
        case "Default":
            style = {
                backgroundColor: "#3f6ad836",
                color: "#3f6ad8"
            }
            break;
        case "Success":
            style= {
                backgroundColor: "",
                color: "#39C16C"
            }
    }

    return (
        <div>
            <a href={props.link}><p>{props.message}</p></a>
        </div>
    )
}

export default Message;