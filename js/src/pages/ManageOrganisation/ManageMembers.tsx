import React, { useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import Button from '../../components/shared/Button';
import ButtonLink, { ButtonPageNavContainer } from '../../components/ButtonLink';
import Card, { CardHeader } from '../../components/shared/Card/Card';
import { Col, Row } from '../../components/Layout';
import PageTitle from '../../components/shared/PageTitle';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from '../../components/Table';
import TableControls from '../../components/shared/TableControls/TableControls';
import usePagination, { ITableControls } from '../../hooks/usePaginationDeprecated/usePaginationWithSearch';
import { useGetOrganisationMembersQuery, useGetOrganisationQuery } from '../../services/newApi';
import { ManageOrganisationParams, OrganisationMemberType } from '../../services/types';
import AddMember from './AddMember';
import usePaginationWithSearch from '../../hooks/usePaginationWithSearch/usePaginationWithSearch';

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

function useMemberList(slug: string) {
    const pagination = usePaginationWithSearch();
    const { 
        page, 
        skip,
        setTotalPages,
        search
    } = pagination;

    const query = useGetOrganisationMembersQuery({
        slug,
        page,
        search
    }, { skip });

    const totalPages = query.data?.pages || 0;

    useEffect(() => {
        if (totalPages) {
            setTotalPages(totalPages);
        }
    }, [totalPages])

    return {
        ...query,
        ...pagination,
        hasMoreData: page < (query.data?.pages || 0),
    }
}

const MemberList: React.FC<{ slug: string }> = (props) => {

    const handles = useMemberList(props.slug);
    const {
        isLoading,
        data
    } = handles;

    const members = data?.result || [];

    if (!isLoading) {
        return (
            <>
                <Card>
                    <CardHeader title="Members">
                        <TableControls {...handles} />
                    </CardHeader>
                    <Table>
                        <TableHead labels={["Name", "Email", "Role", "Actions"]} />
                        <TableBody>
                            {
                                members && members.length > 0 ? 
                                members.map(m => m.memberEmail && <MemberRow {...m} key={m.memberEmail} />) : 
                                <TableRow><TableCell colSpan={4}>No Members...</TableCell></TableRow>
                            }
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

function useGetOrganisationID() {
    const { slug } = useParams<ManageOrganisationParams>()
    const { data: org } = useGetOrganisationQuery(slug);
    return org && org.organisationID;
}

const ManageMembersRoutes: React.FC = (props) => {
    const { path } = useRouteMatch();
    const orgID = useGetOrganisationID();


    return (
        <Switch>
            <Route path={`${path}/add`}>
                <AddMember orgID={orgID} />
            </Route>
            <Route path={path}>
                <ManageMembers />
            </Route>
        </Switch>
    )
}

export default ManageMembersRoutes;