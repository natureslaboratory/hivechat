import React from 'react';
import { MemberRequestType } from '../services/types';

interface MemberRequestFuncs {
    handleAccept(),
    handleDelete()
}

const MemberRequest : React.FunctionComponent<MemberRequestType & MemberRequestFuncs> = (props) => {
    let name = `${props.member.memberProperties.first_name} ${props.member.memberProperties.last_name}`

    return (
        <tr>
            <td>
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left flex2">
                            <div className="widget-heading">
                                {name}
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
                                {props.requestText}
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
                <div className="widget-heading table-action">
                    <button className="btn btn-primary" onClick={(e) => {
                        e.preventDefault()
                        props.handleAccept()
                    }}>Accept</button>
                    <button className="btn btn-danger" onClick={(e) => {
                        e.preventDefault()
                        props.handleDelete()
                    }}>Delete</button>
                </div>
            </td>
        </tr>
    )
}

export default MemberRequest;