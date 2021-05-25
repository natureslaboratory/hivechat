import React, { useState, useEffect } from 'react';
import Invite, { InviteProps } from './Invite';

type InvitesProps = {

}


const Invites: React.FunctionComponent<InvitesProps> = (props) => {
    const [invites, setInvites] = useState<Array<InviteProps>>([]);

    useEffect(() => {
        getInvites()
    }, [])

    let urlSlug = "";
    let urlSplit = window.location.href.split("/");
    for (let i = 0; i < urlSplit.length; i++) {
        const element = urlSplit[i];
        if (element == "organisations") {
            urlSlug = urlSplit[i+1];
        }
    }


    function getInvites() {
        fetch(`/page-api/get-organisation-invites?urlSlug=${urlSlug}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setInvites(data as Array<InviteProps>)
                }
            })
    }

    function deleteInvite(inviteID: number) {
        fetch(`/page-api/delete-organisation-invite?inviteID=${inviteID}`)
            .then(res => res.json())
            .then(data => {
                getInvites();
            })
    }

    let renderedInvites = invites.map(n => <Invite deleteInvite={deleteInvite} {...n} key={n.inviteID} />)
    let placeholder = <tr><td colSpan={4}>You have no pending invites</td></tr>

    return (
        <div className="card mb-3">
            <div style={{ justifyContent: "space-between" }} className="card-header">
                <h5 className="card-title m-b-0">Pending Invites</h5>
            </div>
            <div className="table-responsive">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Invited By</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedInvites.length > 0 ? renderedInvites : placeholder}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Invites;