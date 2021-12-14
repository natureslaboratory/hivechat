import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import ButtonLink, { ButtonPageNavContainer } from '../../components/ButtonLink';
import { Col, Row } from '../../components/Layout';
import ManageSocials from '../../components/ManageSocials/ManageSocials';
import Button from '../../components/shared/Button';
import Card, { CardBody, CardHeader } from '../../components/shared/Card';
import { FormGroup, FormTextInput, FormSelect } from '../../components/shared/Form';
import FormTextEditor from '../../components/shared/Form/FormTextEditor';
import PageTitle from '../../components/shared/PageTitle';
import Socials from '../../components/Socials';
import useMessage from '../../hooks/useMessage';
import { useGetOrganisationQuery, useUpdateOrganisationMutation } from '../../services/newApi';
import { ManageOrganisationParams, OrganisationType } from '../../services/types';

const ManageDetails: React.FC = (props) => {
    let { slug } = useParams<ManageOrganisationParams>();
    const { data: organisation, isLoading } = useGetOrganisationQuery(slug);
    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <>
            <PageTitle title={`Manage ${organisation.organisationName}`} logoURL={organisation.organisationLogo} />
            <ButtonPageNavContainer>
                <ButtonLink to=".." label={`Back to ${organisation.organisationName}`} type="primary" outline />
            </ButtonPageNavContainer>
            <Row>
                <Col columns={6}>
                    <UpdateOrganisationDetails {...organisation} />
                </Col>
                <Col columns={6}>
                    <ManageSocials />
                </Col>
            </Row>
        </>
    )
}

const UpdateOrganisationDetails: React.FC<OrganisationType> = (props) => {
    const [newOrganisation, setNewOrganisation] = useState({ ...props });
    const { message, updateMessage, resetMessage } = useMessage();
    const [updateOrg, { isLoading, data, isSuccess }] = useUpdateOrganisationMutation();

    function handleChange(e) {
        setNewOrganisation({
            ...newOrganisation,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        updateOrg(newOrganisation);
    }

    useEffect(() => {
        if (isLoading) {
            updateMessage({
                text: "Updating...",
                style: {
                    color: "black"
                }
            }, true)
        } else if (isSuccess) {
            updateMessage({
                text: "Updated!",
                style: {
                    color: "green"
                }
            })
        }
    }, [isLoading, isSuccess])


    return (
        <Card>
            <CardHeader title="Update" />
            <CardBody>
                <FormGroup>
                    <FormTextInput label="Name" type="text" value={newOrganisation.organisationName} onChange={handleChange} id="organisationName" readOnly />
                </FormGroup>
                <FormGroup>
                    <label className="hidden">Slug</label>
                    <input id="form1_organisationSlug" name="organisationSlug" className="form-control" value={newOrganisation.organisationSlug} hidden placeholder="Organisation Slug" type="text" readOnly required />
                    <Link id="slug-container" to={`/organisations/${props.organisationSlug}`}>View Organisation</Link>
                </FormGroup>
                <FormGroup>
                    {/* <FormTextInput label="Description" type="textarea" value={newOrganisation.organisationDesc || ""} onChange={handleChange} id="organisationDesc" /> */}
                    <FormTextEditor label="Description" id="organistionDesc" value={newOrganisation.organisationDesc || ""} updateValue={(value: string) => { setNewOrganisation({ ...newOrganisation, organisationDesc: value }) }} />
                </FormGroup>
                <FormGroup>
                    <FormTextInput label="Logo URL" type="text" value={newOrganisation.organisationLogo || ""} onChange={handleChange} id="organisationLogo" />
                </FormGroup>
                <FormGroup>
                    <FormSelect label="Scope" value={newOrganisation.organisationScope || "Private"} onChange={handleChange} id="organisationScope" options={[{ label: "Private", id: "Private" }, { label: "Public", id: "Public" }]} />
                </FormGroup>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Button type="secondary" label="Update" onClick={handleSubmit} disabled={isLoading} />
                    <p style={message.style}>{message.text}</p>
                </div>
            </CardBody>
        </Card>
    )
}



const ManageDetailsWrapper: React.FC = (props) => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}`}>
                <ManageDetails />
            </Route>
        </Switch>
    )
}

export default ManageDetailsWrapper;