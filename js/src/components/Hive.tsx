import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cell, { ICell } from './NewCell/Cell';
import HiveNav from './HiveNav';
import { CellSmall } from './HiveNavItem';

interface HiveData {
    hiveID : number,
    memberID : number,
    hiveTitle : string,
    hiveCategory : string,
    hivePrivacy : "Public" | "Private" | "Draft",
    introduction : string,
    cells : ICell[]
}

interface HiveProps {
    hiveID?: number
}

const Hive : React.FunctionComponent<HiveProps> = (props) => {
    const [hiveData, setHiveData] = useState<HiveData>();
    const [currentCell, setCurrentCell] = useState<ICell>();
    const [cells, setCells] = useState<ICell[]>([]);
    const [orgSlug, setOrgSlug] = useState("");

    async function getHiveData(orgSlug = "") {
        axios.get(`/page-api/hive/get?hiveID=${props.hiveID}`)
            .then(res => {
                console.log(res.data);
                if (res.status == 200 && res.data) {
                    setHiveData(res.data.hive as HiveData);

                    setCells(res.data.cells as ICell[]);
                    setCurrentCell(res.data.cells[0] as ICell);
                } else if (res.status == 401) {
                    window.location.href = "/explore/organisations/" + orgSlug;
                } else {
                    console.error(res);
                }
            }).catch(err => {
                if (err.response && err.response.status == 401) {
                    window.location.href = "/explore/organisations/" + orgSlug;
                }
            })
    }

    function selectCell(cellID : number) {
        let cell = cells.find(c => c.cellID == cellID);
        setCurrentCell(cell);
    }

    useEffect(() => {
        let urlSplit = window.location.href.split("/");
        let urlSlug = "";
        for (let i = 0; i < urlSplit.length; i++) {
            const element = urlSplit[i];
            if (element == "organisations") {
                urlSlug = urlSplit[i+1];
                setOrgSlug(urlSlug);
            }
        }
        getHiveData(urlSlug)
    }, [])


    let hiveContent = <p>This hive has no cells</p>
    if (cells && cells.length > 0) {
        hiveContent = (
            <div className="row">
                <div className="col-md-8 mb-4">
                    <Cell hiveID={null} cell={currentCell} />
                </div>
                <div className="col-md-4">
                    <HiveNav selectCell={selectCell} cells={cells} currentCellID={currentCell ? currentCell.cellID : -1} />
                </div>
            </div>
        )
    }

    if (hiveData) {
        return (
            <React.Fragment>
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-users icon-gradient bg-mean-fruit"></i>
                            </div>
                            <div> {hiveData.hiveTitle}
                                <div className="page-title-subheading" dangerouslySetInnerHTML={{__html: hiveData.introduction}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => history.back()} className="btn btn-outline-primary mb-4">Back</button> 
                {hiveContent}
            </React.Fragment>
        )
    }
    return <div></div>
}

export default Hive;