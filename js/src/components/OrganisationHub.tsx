import React from 'react';
import { Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import Organisation from './Organisation';
import PageTitle from './PageTitle';

const OrganisationHub: React.FC<RouteComponentProps> = (props) => {

    let { path, url } = useRouteMatch();

    console.log(`${path}/:slug`);
    return (
        <Switch>
            <Route exact path={path}>
                <PageTitle title="Organisations" />
            </Route>
            <Route path={`${path}/:slug`} component={Organisation} />
        </Switch>
    )
}

export default OrganisationHub;