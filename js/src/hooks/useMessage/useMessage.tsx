import { useState } from "react";


type MessageType = {
    text: string,
    style: React.CSSProperties
}

function useMessage() {
    const commonMessageStyle: React.CSSProperties = {
        transitionDuration: "300",
        transitionProperty: "opacity",
    }
    const defaultMessage: MessageType = {
        text: "hello",
        style: {
            ...commonMessageStyle,
            color: "black",
            opacity: 0.2
        }
    }
    const [ message, setMessage ] = useState(defaultMessage);
    const [ timeout, updateTimeout ] = useState<number>(null)

    function updateMessage(message: MessageType, skipTimeout = false) {
        clearTimeout(timeout);
        setMessage({
            text: message.text,
            style: {
                opacity: 1,
                transitionDuration: "300",
                transitionProperty: "opacity",
                ...commonMessageStyle,
                ...message.style
            }
        });
        if (!skipTimeout) {
            let newTimeout = window.setTimeout(() => {
                resetMessage()
            }, 3000)
            updateTimeout(newTimeout);
        }
    }

    function resetMessage() {
        setMessage({
            ...message,
            style: {
                opacity: 0,
                transitionDuration: "300",
                transitionProperty: "opacity",
            }
        });
    }

    return {
        message,
        updateMessage,
        resetMessage
    }
}

export default useMessage;