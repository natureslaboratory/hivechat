import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import ButtonLink, { ButtonPageNavContainer } from '../../components/ButtonLink';
import { Col, Row } from '../../components/Layout';
import Button from '../../components/shared/Button/Button';
import Card, { CardBody, CardHeader } from '../../components/shared/Card/Card';
import Form, { FormButtonsWrapper, FormGroup, FormTextInput } from '../../components/shared/Form/Form';
import PageTitle from '../../components/shared/PageTitle';
import TableControls from '../../components/shared/TableControls/TableControls';
import Table, { TableBody, TableCell, TableHead, TablePlaceholder, TableRow } from '../../components/Table';
import usePaginationWithSearch from '../../hooks/usePaginationWithSearch/usePaginationWithSearch';
import { useCreateOrganisationInviteMutation, useGetOrganisationInvitesQuery } from '../../services/newApi';
import { OrganisationInviteType } from '../../services/types';

const AddMember: React.FC<{ orgID: number }> = ({ orgID }) => {
    console.log(orgID);
    return (
        <>
            <PageTitle title="Add Member" />
            <ButtonPageNavContainer>
                <ButtonLink to=".." label="Back" type="primary" outline />
            </ButtonPageNavContainer>
            <Row>
                <Col columns={6}>
                    <InviteMember orgID={orgID} />
                </Col>
                <Col columns={6}>
                    <InviteList orgID={orgID} />
                </Col>
            </Row>
        </>
    )
}

const InviteMember: React.FC<{ orgID: number }> = ({ orgID }) => {
    const [email, setEmail] = useState("");
    const [sendEmail, setSendEmail] = useState(false);
    const [createInvite, { isLoading: isCreating, isSuccess }] = useCreateOrganisationInviteMutation();

    useEffect(() => {
        console.log(email, sendEmail, orgID);
    })

    function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        console.log(email, sendEmail, orgID);
        createInvite({
            memberEmail: email,
            organisationID: orgID,
            send_email: sendEmail ? "1" : "0"
        })
    }

    return (
        <Card>
            <CardHeader title="Invite A Member" />
            <CardBody>
                <Form>
                    <FormGroup>
                        <FormTextInput type="text" label="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} id="memberEmail" />
                    </FormGroup>
                    <FormGroup className="c-form-check">
                        <label style={{margin: 0}} className="c-form-check__label">Send invite email?</label>
                        <input type="checkbox" id="send_email" checked={sendEmail} onChange={() => setSendEmail(sendEmail ? false : true)} />
                    </FormGroup>
                    <Button type="primary" label="Submit" onClick={handleSubmit} />
                </Form>
            </CardBody>
        </Card>
    )
}

const InviteList: React.FC<{ orgID: number }> = ({ orgID }) => {
    const handles = usePaginationWithSearch();
    const {
        page,
        search,
        setTotalPages,
        skip
    } = handles;

    const query = useGetOrganisationInvitesQuery({
        organisationID: orgID,
        page,
        searchTerm: search
    }, { skip: !orgID || skip });

    
    const { data, isLoading, isSuccess, isError } = query;

    useEffect(() => {
        if (data) {
            setTotalPages(data.pages)
        }
    }, [data])
    
    const invites = data?.result || [];

    let message = "";
    if (isLoading) {
        message = "Loading...";
    } else if (invites && invites.length == 0) {
        message = "No Invites";
    }
    const placeholder = <TablePlaceholder message={message} colSpan={4} />

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <Card>
            <CardHeader title="Pending Invites">
                <TableControls {...handles} {...query} hasMoreData={page < data.pages} />
            </CardHeader>
            <Table>
                <TableHead labels={["Email", "Invited By", "Date", "Actions"]} />
                <TableBody>
                    {invites.length > 0 ? invites.map(i => <InviteRow {...i} key={i.inviteID} />) : placeholder}
                </TableBody>
            </Table>
        </Card>
    )
}

const InviteRow: React.FC<OrganisationInviteType> = (props) => {
    return (
        <TableRow>
            <TableCell>
                {props.memberEmail}
            </TableCell>
            <TableCell>
                {`${props.sender_first_name} ${props.sender_last_name}`}
            </TableCell>
            <TableCell>
                {(new Date(props.dateCreated).toString())}
            </TableCell>
            <TableCell>
                <Button type="danger" label="Delete" />
            </TableCell>
        </TableRow>
    )
}

export default AddMember;