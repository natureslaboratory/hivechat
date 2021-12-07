import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGetOrganisationQuery } from '../services/newApi';
import BackButton from '../components/BackButton';
import Card, { CardBody } from '../components/Card';
import { Row, Col } from '../components/Layout';
import PageTitle from '../components/PageTitle';

type OrganisationProps = RouteComponentProps<{ slug: string }>

const Organisation: React.FC<OrganisationProps> = (props) => {
    const { data: organisation, isLoading } = useGetOrganisationQuery(props.match.params.slug);

    if (isLoading) {
        return <p>Fetching organisation...</p>
    }

    return (
        <>
            <PageTitle title={organisation.organisationName} />
            <BackButton link="/organisations" label="Back To Organisations" />
            <Row>
                <Col columns={6}>
                    <Card title={`About ${organisation.organisationName}`}>
                        <CardBody>
                            <div dangerouslySetInnerHTML={{ __html: organisation.organisationDesc }}></div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Organisation;