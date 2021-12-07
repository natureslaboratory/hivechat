import React from 'react';
import { MemberOrganisation } from '../services/types';
import ButtonLink from './ButtonLink';
import Card from './Card';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from './Table';

type MemberOrganisationsProps = {
    orgs: MemberOrganisation[]
}

const MemberOrganisations: React.FC<MemberOrganisationsProps> = (props) => {
    return (
        <Card title="Your Organisations">
            <Table>
                <TableHead labels={["Name", "Role", "Actions"]} />
                <TableBody>
                    {props.orgs.map(o => <MemberOrganisationRow key={o.organisationName} {...o} />)}
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
                <TableWidget title={props.memberRole} />
            </TableCell>
            <TableCell style={{ display: "flex", gap: "0.2rem" }}>
                <ButtonLink link={`/organisations/${props.organisationSlug}`} target="" label="View" type="primary" />
                <ButtonLink link={`/organisations/${props.organisationSlug}/manage`} target="" label="Manage" type="secondary" />
            </TableCell>
        </TableRow>
    )
}

export default MemberOrganisations;