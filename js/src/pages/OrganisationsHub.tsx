import React from 'react';
import { Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Organisation from './Organisation';

const OrganisationsHub: React.FC<RouteComponentProps> = (props) => {

    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <PageTitle title="Organisations" />
            </Route>
            <Route path={`${path}/:slug`} component={Organisation} />
        </Switch>
    )
}

export default OrganisationsHub;