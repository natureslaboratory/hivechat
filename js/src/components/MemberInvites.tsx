import React from 'react';
import { useGetMemberInvitesQuery } from '../services/newApi';
import { MemberInvite } from '../services/types';
import ButtonLink from './ButtonLink';
import Card, { CardHeader } from './shared/Card/Card';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from './Table';

type MemberInvitesProps = {
    invites: MemberInvite[]
}

export const MemberInvites: React.FC<MemberInvitesProps> = (props) => {

    const { data: invites, isLoading } = useGetMemberInvitesQuery("");

    const noInvites = (
        <TableRow>
            <TableCell colSpan={3}>
                You have no pending invites
            </TableCell>
        </TableRow>
    )

    const loading = (
        <TableRow>
            <TableCell colSpan={3}>
                <TableWidget title="Loading..." />
            </TableCell>
        </TableRow>
    )

    const inviteRows = props.invites && props.invites.map(i => <MemberInvitesRow key={i.inviteID} {...i} />)

    return (
        <Card>
            <CardHeader title="Your Invites" />
            <Table>
                <TableHead labels={["Organisation", "Invited By", "Actions"]} />
                <TableBody>
                    {isLoading ? loading : invites && invites.length > 0 ? invites.map(i => <MemberInvitesRow key={i.inviteID} {...i} />) : noInvites}
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
                <TableWidget title={props.senderName} />
            </TableCell>
            <TableCell style={{ display: "flex", gap: "0.2rem" }}>
                <ButtonLink to={`/accounts/invites/${props.inviteID}`} target="" label="Click to View Invitation" type="primary" />
            </TableCell>
        </TableRow>
    )
}