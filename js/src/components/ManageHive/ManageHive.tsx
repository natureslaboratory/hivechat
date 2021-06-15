import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Back from '../Back';
import Hives from '../Hives';
import Title from '../Title';
import { CellProps } from './ManageCell';
import HiveDetails, { HiveDetailsFuncs, HiveDetailsProps } from './HiveDetails';
import ListCells from './ListCells';
import CellEditor, { CellEditorProps } from '../NewCell/Editor/NewCellEditor';
import CreateCell, { CellDetails } from '../NewCell/Editor/CreateCell';

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
    const [hiveDetails, setHiveDetails] = useState<HiveDetailsProps>(null);
    const [cells, setCells] = useState<CellProps[]>([]);
    const [cell, setCell] = useState<CellEditorProps>(null);
    const [newCell, setNewCell] = useState(false);

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

    async function updateHive(hive: HiveDetailsProps) {
        let data = new FormData();
        let hiveData = JSON.stringify(hive);

        data.append("type", "hiveDetails");
        data.append("hive", hiveData);

        axios.post("/page-api/manage-hive", data)
            .then(res => {
                getHiveDetails();
            })
    }

    function editDetails(e) {

    }

    function addCell(newCell: CellDetails) {
        console.log("create");
        let formData = new FormData();

        formData.append("cellTitle", newCell.cellTitle);
        formData.append("cellSubtitle", newCell.cellSubtitle);

        console.log(newCell)

        if (newCell.cellDate && newCell.cellTime) {
            formData.append("cellDate", `${newCell.cellDate} ${newCell.cellTime}`)
        }

        formData.append("hiveID", hiveID.toString())

        axios.post("/page-api/cell/create", formData).then((res) => {
            console.log(res);
            setNewCell(false);
            getCells();
        })
    }

    function handleBack() {
        if (cell) {
            setCell(null);
        } else if (newCell) {
            setNewCell(false)
        } else {
            window.location.href = `/explore/organisations/${organisationSlug}/manage/hives/`
        }
    }

    let content = null;
    let rightColumn = (
        <>
            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary" onClick={() => setNewCell(true)}>+ New Cell</button>
            </div>
            {cells.length > 0 && <ListCells cells={cells} getCells={getCells} setCell={(cellID: number) => setCell({ cellID, hiveID })} />}
        </>
    );
    let link = `/explore/organisations/${organisationSlug}/manage`;

    if (newCell) {
        rightColumn = <CreateCell hiveID={hiveID} addCell={addCell} cancelCreateCell={() => setNewCell(false)}  />
    }

    if (cell) {
        link = window.location.href;
        content = (
            <>
                <CellEditor getCells={getCells} {...cell} />
            </>
        )
    } else {
        content = (
            <div className="row">
                <div className="col-md-6">
                    {hiveDetails && <HiveDetails {...hiveDetails} getHive={getHiveDetails} updateHive={updateHive} />}
                </div>
                <div className="col-md-6" style={{ margin: "0 auto" }}>
                    {rightColumn}
                </div>
            </div>
        )
    }

    return (
        <>
            <Title title={hiveDetails && `Manage ${hiveDetails.hiveTitle}`} />
            <button style={{marginBottom: "2rem"}} onClick={handleBack} className="btn btn-outline-primary">Back</button>
            {content}
        </>
    )
}

export default ManageHive;