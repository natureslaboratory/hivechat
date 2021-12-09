import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import Button from '../../components/Button';
import ButtonLink, { ButtonPageNavContainer } from '../../components/ButtonLink';
import Card, { CardHeader } from '../../components/Card';
import { Col, Row } from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from '../../components/Table';
import TableControls from '../../components/TableControls';
import useGetPaginatedOrganisationMembers from '../../hooks/useGetPaginatedOrganisationMembers';
import { ManageOrganisationParams, OrganisationMemberType } from '../../services/types';
import AddMember from './AddMember';

const ManageMembers: React.FC = (props) => {
    const { url } = useRouteMatch();
    const { slug } = useParams<ManageOrganisationParams>();

    return (
        <>
            <PageTitle title="Manage Members" />
            <ButtonPageNavContainer>
                <ButtonLink to=".." label="Back" type="primary" outline />
                <ButtonLink to={`${url}add`} label="+ Add Member" type="primary" />
            </ButtonPageNavContainer>
            <Row>
                <Col columns={12}>
                    <MemberList slug={slug} />
                </Col>
            </Row>
        </>
    )
}

const MemberList: React.FC<{ slug: string }> = (props) => {
    const data = useGetPaginatedOrganisationMembers({ slug: props.slug });
    const {
        isLoading,
        members
    } = data;

    if (!isLoading) {
        return (
            <>
                <Card>
                    <CardHeader title="Members">
                        <TableControls {...data} />
                    </CardHeader>
                    <Table>
                        <TableHead labels={["Name", "Email", "Role", "Actions"]} />
                        <TableBody>
                            {members ? members.map(m => m.memberEmail && <MemberRow {...m} key={m.memberEmail} />) : <p>No Members</p>}
                        </TableBody>
                    </Table>
                </Card>
            </>
        )
    }


    return (
        <>
            <Card>
                <CardHeader title="Members" />
                <Table>
                    <TableHead labels={["Name", "Email", "Role", "Actions"]} />
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <TableWidget title="Loading..." />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}

const MemberRow: React.FC<OrganisationMemberType> = (props) => {
    return (
        <TableRow>
            <TableCell>
                <TableWidget title={`${props.memberProperties.first_name} ${props.memberProperties.last_name}`} />
            </TableCell>
            <TableCell>
                <TableWidget title={props.memberEmail} />
            </TableCell>
            <TableCell>
                <TableWidget title={props.isAdmin ? "Admin" : "Member"} />
            </TableCell>
            <TableCell>
                <ButtonLink label="Manage" to="/" type="primary" size="small" />
            </TableCell>
        </TableRow>
    )
}

const ManageMembersRoutes: React.FC = (props) => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/add`}>
                <AddMember />
            </Route>
            <Route path={path}>
                <ManageMembers />
            </Route>
        </Switch>
    )
}

export default ManageMembersRoutes;