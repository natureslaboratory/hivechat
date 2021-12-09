import React from 'react';
import { Link, Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import Button from '../components/Button';
import Card, { CardHeader } from '../components/Card';
import PageTitle from '../components/PageTitle';
import Table, { TableBody, TableCell, TableHead, TableRow, TableWidget } from '../components/Table';
import TableControls from '../components/TableControls';
import usePagination from '../hooks/usePagination';
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
    // const data = useGetPaginatedOrganisations();

    const data = usePagination<any, OrganisationType>({
        args: {},
        callable: useGetOrganisationsQuery
    });

    const {
        isLoading,
        data: orgs
    } = data;

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

    console.log(isLoading);

    return (
        <Card>
            <CardHeader title="Public Organisations">
                    {orgs && <TableControls {...data} />}
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