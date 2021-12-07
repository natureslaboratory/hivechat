import React from 'react';
import ButtonLink from './ButtonLink';
import Card from './Card';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from './Table';

type MemberInvitesProps = {
    invites: MemberInvite[]
}

export type MemberInvite = {
    inviteID: number
    organisationName: string
    invitedBy: string
}

export const MemberInvites: React.FC<MemberInvitesProps> = (props) => {
    const noInvites = (
        <TableCell colSpan={3}>
            You have no pending invites
        </TableCell>
    )

    const invites = props.invites && props.invites.map(i => <MemberInvitesRow key={i.inviteID} {...i} />)

    return (
        <Card title="Your Invites">
            <Table>
                <TableHead labels={["Organisation", "Invited By", "Actions"]} />
                <TableBody>
                    {props.invites ? invites : noInvites}
                </TableBody>
            </Table>
        </Card>
    )
}

export const MemberInvitesRow: React.FC<MemberInvite> = (props) => {
    return (
        <TableRow>
            <TableCell>
                <TableWidget title={props.organisationName} />
            </TableCell>
            <TableCell>
                <TableWidget title={props.invitedBy} />
            </TableCell>
            <TableCell style={{ display: "flex", gap: "0.2rem" }}>
                <ButtonLink link={`/accounts/invites/${props.inviteID}`} target="" label="Click to View Invitation" type="primary" />
            </TableCell>
        </TableRow>
    )
}