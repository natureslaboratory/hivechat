import React from 'react';
import { Link, Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import Button from '../components/shared/Button';
import Card, { CardHeader } from '../components/shared/Card/Card';
import PageTitle from '../components/shared/PageTitle';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from '../components/Table';
import TableControls from '../components/shared/TableControls/TableControls';
import usePagination from '../hooks/usePaginationWithSearch/usePaginationWithSearch';
import { useGetOrganisationsQuery } from '../services/newApi';
import { OrganisationType } from '../services/types';
import Organisation from './Organisation';

const OrganisationsHub: React.FC<RouteComponentProps> = (props) => {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <PageTitle title="Organisations" />
                <OrganisationTable />
            </Route>
            <Route path={`${path}/:slug`} component={Organisation} />
        </Switch>
    )
}

const OrganisationTable: React.FC = (props) => {
    const pagination = usePagination();
    const query = useGetOrganisationsQuery({
        page: pagination.page,
        search: pagination.search
    }, { skip: pagination.skip });

    const totalPages = query.data?.pages || 0;
    const orgs = query.data?.result || [];

    let content = null;
    if (orgs) {
        content = (
            <>
                <TableBody>
                    {orgs.map(o => <OrganisationTableRow {...o} key={o.organisationSlug} />)}
                </TableBody>
            </>
        )
    }

    console.log(query.isLoading);

    return (
        <Card>
            <CardHeader title="Public Organisations">
                    {orgs && <TableControls {...pagination} {...query} hasMoreData={pagination.page < totalPages} />}
            </CardHeader>
            <Table>
                <TableHead labels={["Name"]} />
                {!orgs ? <TableWidget title="Loading..." /> : content}
            </Table>
        </Card>
    )
}

const OrganisationTableRow: React.FC<OrganisationType> = (props) => {
    const { url } = useRouteMatch();
    return (
        <TableRow>
            <TableCell>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <TableWidget title={props.organisationName} />
                    <Link to={`${url}${props.organisationSlug}`}>
                        <Button type="primary" label="View" />
                    </Link>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default OrganisationsHub;