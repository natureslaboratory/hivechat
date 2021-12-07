import React from 'react';
import { Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Organisation from './Organisation';

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