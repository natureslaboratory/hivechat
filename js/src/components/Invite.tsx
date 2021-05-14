import React from 'react';

export interface InviteProps {
    inviteID : number,
    memberEmail : string,
    senderID : number,
    organisationID : number,
    sender_first_name : string,
    sender_last_name : string,
    dateCreated : string
    deleteInvite(inviteID : number) : void
}


const Invite : React.FunctionComponent<InviteProps> = (props) => {
    console.log(props);
    return (
        <tr>
            <td>
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left flex2">
                            <div className="widget-heading">
                                {props.memberEmail}
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left flex2">
                            <div className="widget-heading">
                                {`${props.sender_first_name} ${props.sender_last_name}`}
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left flex2">
                            <div className="widget-heading">
                                {props.dateCreated}
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="widget-heading">
                    <button className="btn btn-danger" onClick={(e) => {
                        e.preventDefault()
                        props.deleteInvite(props.inviteID)
                    }}>Delete</button>
                </div>
            </td>
        </tr>
    )
}

export default Invite;