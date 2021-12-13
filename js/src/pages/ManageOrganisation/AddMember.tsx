import React from 'react';
import ButtonLink, { ButtonPageNavContainer } from '../../components/ButtonLink';
import PageTitle from '../../components/shared/PageTitle';

const AddMember: React.FC = (props) => {
    return (
        <>
            <PageTitle title="Add Member" />
            <ButtonPageNavContainer>
                <ButtonLink to=".." label="Back" type="primary" outline />
            </ButtonPageNavContainer>
        </>
    )
}

export default AddMember;