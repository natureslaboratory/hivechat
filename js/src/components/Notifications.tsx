import React, { useState, useEffect } from 'react';
import Notification, { NotificationProps } from './Notification';

type NotificationsProps = {

}


const Notifications: React.FunctionComponent<NotificationsProps> = (props) => {
    const [notifications, setNotifications] = useState<Array<NotificationProps>>([]);
    const [updateInterval, setUpdateInterval] = useState(null);

    useEffect(() => {
        getNotifications()
        let interval = setInterval(async () => {
            await markAsRead();
            getNotifications()
        }, 5000);

        setUpdateInterval(interval);

        return () => {
            clearInterval(updateInterval)
        }
    }, [])


    function getNotifications() {
        fetch("/page-api/get-notifications")
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setNotifications(data as Array<NotificationProps>)
                }
            })
    }

    async function markAsRead() {
        return fetch("/page-api/notifications-read")
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    function deleteNotification(notificationID: number) {
        fetch(`/page-api/delete-notification?notificationID=${notificationID}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data);
                    if (data.deleted) {
                        console.log("deleted")
                    } else {
                        console.log("not deleted")
                    }
                }
                getNotifications();
            })
    }

    let renderedNotifications = notifications.map(n => <Notification deleteNotification={deleteNotification} {...n} key={n.notificationID} />)
    let placeholder = <tr><td>You have no notifications</td></tr>

    return (
        <div className="card mb-3">
            <div style={{ justifyContent: "space-between" }} className="card-header">
                <h5 className="card-title m-b-0">Notifications</h5>
            </div>
            <div className="table-responsive">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <tbody>
                        {renderedNotifications.length > 0 ? renderedNotifications : placeholder}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Notifications;