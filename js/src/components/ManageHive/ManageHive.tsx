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
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ICell } from '../NewCell/Cell';

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
    backURL: string
}

const ManageHive: React.FunctionComponent<ManageHiveProps> = ({ organisationSlug, hiveID, organisationID, organisationName, backURL }) => {
    const [hiveDetails, setHiveDetails] = useState<HiveDetailsProps>(null);
    const [cells, setCells] = useState<ICell[]>([]);
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
                let cells = res.data.map((c) => {
                    return {
                        ...c,
                        cellOrder: parseInt(c.cellOrder)
                    }
                })
                updateCells(cells as ICell[]);
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
        let formData = new FormData();

        formData.append("cellTitle", newCell.cellTitle);
        formData.append("cellSubtitle", newCell.cellSubtitle);

        if (newCell.cellDate && newCell.cellTime) {
            formData.append("cellDate", `${newCell.cellDate} ${newCell.cellTime}`)
        }

        formData.append("hiveID", hiveID.toString())

        axios.post("/page-api/cell/create", formData).then((res) => {
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
            window.location.href = backURL;
        }
    }

    function updateCells(cells: ICell[]) {
        let newCells = cells.sort((a, b) => {
            if (a.cellOrder > b.cellOrder) {
                return 1;
            } else if (a.cellOrder < b.cellOrder) {
                return -1;
            } else {
                return 0;
            }
        })
        setCells(newCells);
    }

    function handleDrop(drop: DropResult) {
        let newCells = [...cells];
        newCells[drop.source.index].cellOrder = newCells[drop.destination.index].cellOrder;
        if (drop.source.index < drop.destination.index) {
            for (let i = drop.source.index + 1; i < drop.destination.index + 1; i++) {
                newCells[i].cellOrder = newCells[i].cellOrder - 1;
            }
        } else if (drop.source.index > drop.destination.index) {
            for (let i = drop.destination.index; i < drop.source.index; i++) {
                newCells[i].cellOrder = newCells[i].cellOrder + 1;
            }
        }
        updateCells(newCells);

        let data = new FormData();

        newCells = newCells.map((c, i) => {
            let newCell = {...c};
            if (!newCell.cellDate) {
                delete newCell.cellDate;
            }
            return newCell;
        })

        data.append("cellList", JSON.stringify(newCells));

        axios.post("/page-api/cell/update-bulk", data)
            .then(res => {
                getCells();
            }).catch(err => {
                console.error(err);
            })
    }

    let content = null;
    let link = `/explore/organisations/${organisationSlug}/manage`;
    // console.log(cells);

    if (cell) {
        link = window.location.href;
        content = (
            <>
                <CellEditor getCells={getCells} {...cell} />
            </>
        )
    } else {
        let rightColumn = null;
        if (newCell) {
            rightColumn = <CreateCell hiveID={hiveID} addCell={addCell} cancelCreateCell={() => setNewCell(false)} />
        } else {
            rightColumn = (
                <>
                    <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}>
                        <button className="btn btn-primary" onClick={() => setNewCell(true)}>+ New Cell</button>
                    </div>
                    <div>
                        {cells.length > 0 && <ListCells handleDrop={handleDrop} cells={cells} getCells={getCells} setCell={(cellID: number) => setCell({ cellID, hiveID })} />}
                    </div>
                </>
            );
        }

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
            <button style={{ marginBottom: "2rem" }} onClick={handleBack} className="btn btn-outline-primary">Back</button>
            {content}
        </>
    )
}

export default ManageHive;