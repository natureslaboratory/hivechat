import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Back from '../Back';
import Hives from '../Hives';
import Title from '../Title';
import { CellProps } from './ManageCell';
import HiveDetails, { HiveDetailsFuncs, HiveDetailsProps } from './HiveDetails';
import ListCells from './ListCells';

interface Organisation {
    organisationID: string,
    organisationName: string,
    organisationSlug: string
}

interface ManageHiveProps {
    organisationSlug: string,
    organisationName: string,
    organisationID: number,
    hiveID: number
}

const ManageHive: React.FunctionComponent<ManageHiveProps> = ({ organisationSlug, hiveID, organisationID, organisationName }) => {
    const [organisation, setOrganisation] = useState<Organisation>({
        organisationID: "",
        organisationName: "",
        organisationSlug: ""
    })
    const [hiveDetails, setHiveDetails] = useState<HiveDetailsProps>(null);
    const [cells, setCells] = useState<CellProps[]>([]);

    function goBack(e: React.MouseEvent<HTMLElement>) {

    }

    useEffect(() => {
        getHiveDetails()
        getCells();
    }, [])

    function getHiveDetails() {
        axios.get(`/page-api/manage-hive?hiveID=${hiveID}&action=get-hive`)
            .then(res => {
                setHiveDetails(res.data as HiveDetailsProps);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function getCells() {
        axios.get(`/page-api/manage-hive?hiveID=${hiveID}&action=get-cells`)
            .then(res => {
                setCells(res.data as CellProps[])
            })
    }

    useEffect(() => {
    }, [cells]);

    async function updateHive(hive : HiveDetailsProps) {
        let data = new FormData();
        let hiveData = JSON.stringify(hive);

        data.append("type", "hiveDetails");
        data.append("hive", hiveData);

        axios.post("/page-api/manage-hive", data)
            .then(res => {
                console.log(res);
                getHiveDetails();
            })
    }

    function editDetails(e) {

    }

    return (
        <>
            <Title title={hiveDetails && `Manage ${hiveDetails.hiveTitle}`} />
            <Back goBack={goBack} label="Back" link={`/explore/organisations/${organisation.organisationSlug}/manage`} />
            <div className="row" style={{ marginBottom: "20rem" }}>
                <div className="col-md-6">
                    {hiveDetails && <HiveDetails {...hiveDetails} getHive={getHiveDetails} updateHive={updateHive} />}
                </div>
                <div className="col-md-6" style={{ margin: "0 auto" }}>
                    {cells.length > 0 && <ListCells cells={cells} getCells={getCells} />}
                </div>
            </div>
        </>
    )
}

export default ManageHive;