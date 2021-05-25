import React, { useState, useEffect, CSSProperties } from 'react';
import HiveNavItem, { CellSmall } from './HiveNavItem';
import { CellData } from './Cell';

export interface HiveNavProps {
    cells : CellData[],
    currentCellID : number 
}

interface HiveNavFuncs {
    selectCell(cellID : number) : void
}

const cardStyle : CSSProperties = {
    backgroundColor: "transparent",
    boxShadow: "none"
}

const HiveNav : React.FunctionComponent<HiveNavProps & HiveNavFuncs> = (props) => {
    const [page, setPage] = useState(0);
    const [slicedCells, setSlicedCells] = useState<CellData[]>([]);
    const [search, setSearch] = useState("");
    const cellsPerPage = 10;

    function filterCells(cells : CellData[]) {
        return props.cells.filter(c => {
            let match = false;
            for (const key in c) {
                if (Object.prototype.hasOwnProperty.call(c, key)) {
                    const element = c[key];
                    if (typeof(element) == "string" && element.toLowerCase().includes(search.toLowerCase())) {
                        match = true;
                    }
                }
            }
            return match;
        })
    }

    function sliceCells(cells : CellData[]) {
        let firstIndex = cellsPerPage * page;
        let lastIndex = firstIndex + cellsPerPage;
        return cells.slice(firstIndex, lastIndex);
    }

    useEffect(() => {
        let filteredCells = filterCells(props.cells);
        let cutCells = sliceCells(filteredCells);
        setSlicedCells(cutCells);
    }, [page, search])
    

    let pagination = (
        <div style={{display: "flex", gap: "0.8rem", alignItems: "center"}}>
            <button onClick={() => {
                if (page > 0) {
                    setPage(page-1)
                }
            }} className="btn btn-alternate"><i className="fas fa-chevron-left"></i></button>
            {page+1}
            <button onClick={() => {
                let nextPageExists = props.cells.length - (cellsPerPage * (page+1));
                if (nextPageExists) {
                    setPage(page+1);
                }
            }} className="btn btn-alternate"><i className="fas fa-chevron-right"></i></button>
        </div>
    )

    return (
        <div className="main-card mb-3 card" style={cardStyle}>
            <div className="card-body">
                <div className="card-title" style={{display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "space-between", alignItems: "stretch"}}>
                    {props.cells.length > cellsPerPage ? pagination : null}
                    <input style={{padding: "0.2rem 0.4rem"}} placeholder="Search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                </div>
                <ul className="list-group">
                    {slicedCells.map(c => <HiveNavItem selectCell={props.selectCell} active={c.cellID == props.currentCellID} {...c} key={c.cellID} />)}
                </ul>
            </div>
        </div>
    )
}

export default HiveNav;