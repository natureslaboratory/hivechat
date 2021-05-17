import React from 'react';

export interface NotificationProps {
    notificationID : number,
    memberID : number,
    creatorID : number,
    notificationMessage : string,
    notificationLink : string,
    notificationRead : number,
    deleteNotification(notificationID : number) : void
}


const Notification : React.FunctionComponent<NotificationProps> = (props) => {
    return (
        <tr>
            <td>
                <div className="widget-heading">
                    <div className={`c-notification ${props.notificationRead > 0 ? "c-notification--read" : ""}`}>
                        <p><a href={props.notificationLink}>{props.notificationMessage}</a></p>
                        <button className="btn btn-outline-primary" onClick={(e) => {
                            e.preventDefault()
                            props.deleteNotification(props.notificationID)
                        }}>Dismiss</button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Notification;