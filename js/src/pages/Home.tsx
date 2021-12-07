import React from 'react';
import Card, { CardBody } from '../components/Card';
import { Col, Row } from '../components/Layout';
import { MemberInvite, MemberInvites } from '../components/MemberInvites';
import MemberOrganisations from '../components/MemberOrganisations';
import PageTitle from '../components/PageTitle';
import { MemberOrganisation } from '../services/types';

const Home: React.FC = (props) => {
    const dummyMemberOrganisations: MemberOrganisation[] = [
        {
            organisationName: "International Propolis Research Group",
            memberRole: "Admin",
            organisationSlug: "international-propolis-research-group"
        },
        {
            organisationName: "Test Organisation",
            memberRole: "Admin",
            organisationSlug: "test-organisation"
        },
    ]

    const dummyInvites: MemberInvite[] = [
        {
            inviteID: 1,
            organisationName: "Google",
            invitedBy: "Sergei"
        },
        {
            inviteID: 2,
            organisationName: "Microsoft",
            invitedBy: "Bill Gates"
        },
        {
            inviteID: 3,
            organisationName: "Nature's Laboratory",
            invitedBy: "James Fearnley"
        }
    ]

    return (
        <>
            <PageTitle title="Welcome, Caleb" subtitle={<>Manage your <strong>Hivechat</strong> account</>} />
            <Row>
                <Col columns={6}>
                    <MemberOrganisations orgs={dummyMemberOrganisations} />
                </Col>
                <Col columns={6}>
                    <MemberInvites invites={dummyInvites} />
                </Col>
            </Row>
            <Row>
                <Col columns={6}>
                    <Card title="Account">
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

export default Home;