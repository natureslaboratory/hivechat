import React, { useState } from 'react';
import Back from '../Back';
import Hives from '../Hives';
import Title from '../Title';

interface Organisation {
    organisationID : string,
    organisationName : string,
    organisationSlug : string
}

interface ManageHiveProps {
    
}

const ManageHive : React.FunctionComponent = () => {
    const [organisation, setOrganisation] = useState<Organisation>({
        organisationID: "",
        organisationName: "",
        organisationSlug: ""
    })

    function goBack(e : React.MouseEvent<HTMLElement>) {

    }

    return (
        <React.Fragment>
            <Title title="Manage your organisation hives" />
            <Back goBack={goBack} label="Back" link={`/explore/organisations/${organisation.organisationSlug}/manage`} />
        </React.Fragment>
    )
}

export default ManageHive;