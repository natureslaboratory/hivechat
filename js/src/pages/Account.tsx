import React from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router';
import Card, { CardBody, CardHeader } from '../components/shared/Card/Card';
import { Col, Row } from '../components/Layout';
import { MemberInvites } from '../components/MemberInvites';
import MemberOrganisations from '../components/MemberOrganisations';
import PageTitle from '../components/shared/PageTitle';
import { useGetMemberDetailsQuery } from '../services/newApi';
import { MemberInvite, MemberOrganisation } from '../services/types';

const Account: React.FC = (props) => {
    const dummyInvites: MemberInvite[] = [
        {
            inviteID: 1,
            organisationName: "Google",
            senderName: "Sergei"
        },
        {
            inviteID: 2,
            organisationName: "Microsoft",
            senderName: "Bill Gates"
        },
        {
            inviteID: 3,
            organisationName: "Nature's Laboratory",
            senderName: "James Fearnley"
        }
    ]

    const { data: member, isLoading } = useGetMemberDetailsQuery("");

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (member && !member.memberEmail) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <PageTitle title={`Welcome, ${member.memberProperties.first_name}`} subtitle={<>Manage your <strong>Hivechat</strong> account</>} />
            <Row>
                <Col columns={6}>
                    <MemberOrganisations />
                </Col>
                <Col columns={6}>
                    <MemberInvites invites={dummyInvites} />
                </Col>
            </Row>
            <Row>
                <Col columns={6}>
                    <Card>
                        <CardHeader title="Account" />
                        <CardBody>
                            <p>
                                Manage your account details.
                            </p>
                            <a href="/admin/account">
                                <button className="btn btn-primary">
                                    Manage
                                </button>
                            </a>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Account;