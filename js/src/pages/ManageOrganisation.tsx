import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import ButtonLink, { ButtonPageNavContainer } from '../components/ButtonLink';
import Card, { CardBody, CardHeader } from '../components/Card';
import { Col, Row } from '../components/Layout';
import PageTitle from '../components/PageTitle';
import { useGetOrganisationQuery } from '../services/newApi';
import { ManageOrganisationParams } from '../services/types';
import ManageMembers from './ManageOrganisation/ManageMembers';

type ManageCard = {
    title: string
    description?: string
    link: string
}

const ManageOrganisation: React.FC = (props) => {

    let { path, url } = useRouteMatch();
    let { slug } = useParams<ManageOrganisationParams>();

    const { data: organisation, isLoading } = useGetOrganisationQuery(slug);

    if (isLoading) {
        return <p>Loading...</p>
    }

    const manageCardInfo: ManageCard[] = [
        {
            title: "Hives",
            description: "Keep track of all your organisations hives.",
            link: "hives"
        },
        {
            title: "Members",
            description: "View and manage all members.",
            link: "members"
        },
        {
            title: "Details",
            description: "Edit your organisation name, description, logo, social media, and more.",
            link: "details"
        }
    ]

    return (
        <>
            <PageTitle title={`Manage ${organisation.organisationName}`} />
            <ButtonPageNavContainer>
                <ButtonLink to=".." label={`Back to ${organisation.organisationName}`} type="primary" outline />
            </ButtonPageNavContainer>
            <Row>
                {manageCardInfo.map(c => <ManageOrganisationCard key={c.title} {...c} />)}
            </Row>
        </>
    )
}

const ManageOrganisationCard: React.FC<ManageCard> = (props) => {
    let { url } = useRouteMatch();
    return (
        <Col columns={4}>
            <Card>
                <CardHeader title={props.title} />
                <CardBody>
                    {props.description && <p>{props.description}</p>}
                    <ButtonLink to={`${url}${props.link}`} type="primary" label="Manage" />
                </CardBody>
            </Card>
        </Col>
    )
}

const ManageOrganisationRoutes: React.FC = (props) => {
    let { path } = useRouteMatch();

    console.log(path);
    return (
        <Switch>
            <Route path={`${path}/members`}>
                <ManageMembers />
            </Route>
            <Route path={path}>
                <ManageOrganisation />
            </Route>
        </Switch>
    )
}

export default ManageOrganisationRoutes;