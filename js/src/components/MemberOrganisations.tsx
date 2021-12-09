import React from 'react';
import { useGetMemberOrganisationsQuery } from '../services/newApi';
import { MemberOrganisation } from '../services/types';
import ButtonLink from './ButtonLink';
import Card, { CardHeader } from './Card';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from './Table';

const MemberOrganisations: React.FC = (props) => {
    const { data: orgs, isLoading } = useGetMemberOrganisationsQuery("");

    let placeholder = (
        <TableRow>
            <TableCell colSpan={3}>
                <TableWidget title="Loading..." />
            </TableCell>
        </TableRow>
    )


    return (
        <Card>
            <CardHeader title="Your Organisations" />
            <Table>
                <TableHead labels={["Name", "Role", "Actions"]} />
                <TableBody>
                    {orgs ? orgs.map(o => <MemberOrganisationRow key={o.organisationName} {...o} />) : placeholder}
                </TableBody>
            </Table>
        </Card>
    )
}

const MemberOrganisationRow: React.FC<MemberOrganisation> = (props) => {
    return (
        <TableRow>
            <TableCell>
                <TableWidget title={props.organisationName} />
            </TableCell>
            <TableCell>
                <TableWidget title={props.isAdmin ? "Admin" : "Member"} />
            </TableCell>
            <TableCell style={{ display: "flex", gap: "0.2rem" }}>
                <ButtonLink to={`/organisations/${props.organisationSlug}`} target="" label="View" type="primary" />
                {props.isAdmin && <ButtonLink to={`/organisations/${props.organisationSlug}/manage`} target="" label="Manage" type="secondary" />}
            </TableCell>
        </TableRow>
    )
}

export default MemberOrganisations;