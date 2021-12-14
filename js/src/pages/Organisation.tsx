import React from 'react';
import { Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import { useGetOrganisationQuery, useGetOrganisationSocialsQuery } from '../services/newApi';
import ButtonLink, { ButtonPageNavContainer } from '../components/ButtonLink';
import Card, { CardBody, CardHeader } from '../components/shared/Card/Card';
import { Row, Col } from '../components/Layout';
import PageTitle from '../components/shared/PageTitle';
import ManageOrganisation from './ManageOrganisation';

type OrganisationProps = RouteComponentProps<{ slug: string }>

const Organisation: React.FC<OrganisationProps> = (props) => {
    const { data: organisation, isLoading } = useGetOrganisationQuery(props.match.params.slug);
    const { data: socials } = useGetOrganisationSocialsQuery(organisation && organisation.organisationID);

    if (isLoading) {
        return <p>Fetching organisation...</p>
    }

    return (
        <>
            <PageTitle title={organisation.organisationName} socials={socials} logoURL={organisation.organisationLogo} />
            <ButtonPageNavContainer>
                <ButtonLink to="/organisations" label="Back To Organisations" type="primary" outline />
                {organisation.isAdmin && <ButtonLink to={`${props.match.url}manage`} label="Manage" type="primary" />}
            </ButtonPageNavContainer>
            <Row>
                <Col columns={6}>
                    <Card>
                        <CardHeader title={`About ${organisation.organisationName}`} />
                        <CardBody>
                            <div dangerouslySetInnerHTML={{ __html: organisation.organisationDesc }}></div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

const OrganisationRouting: React.FC = (props) => {
    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/manage`}>
                <ManageOrganisation />
            </Route>
            <Route path={path} component={Organisation} />
        </Switch>
    )
}

export default OrganisationRouting;