// import React = require("react");
import React, { useState, useEffect } from 'react';
import Hive, { HiveProps } from './Hive';

interface HivesContainerProps {
    hives : Array<HiveProps>,
    title : string
}

const HivesContainer : React.FunctionComponent<HivesContainerProps> = (props) => {
    const [page, setPage] = useState(1);
    const [hivesPerPage, setHivesPerPage] = useState(6);
    const [filteredHives, setFilteredHives] = useState([]);
    const [slicedHives, setSlicedHives] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        filterHives();
    }, [searchTerm, props.hives])

    useEffect(() => {
        sliceHives();
    }, [page, filteredHives])

    function isNextPage() {
        let totalHives = props.hives.length;
        let currentLastHiveOnPage = page * hivesPerPage;
        if (currentLastHiveOnPage + 1 > totalHives) {
            return false;
        }
        return true;
    }

    function sliceHives() {
        let firstHive = (page-1) * hivesPerPage;
        setSlicedHives(
            filteredHives.slice(firstHive, firstHive + hivesPerPage)
        )
    }

    function filterHives() {
        setFilteredHives(
            props.hives.filter(hive => filterBySearchTerm(hive))
        )
    }

    function filterBySearchTerm(hive : HiveProps) {
        if (hive.hiveTitle && hive.hiveTitle.toLowerCase().includes(searchTerm)) {
            return true;
        } else if (hive.hiveIntro && hive.hiveIntro.toLowerCase().includes(searchTerm)) {
            return true;
        }
        return false;
    }
    

    const hives = slicedHives.map(hive => <Hive {...hive} key={hive.hiveID} /> )

    let pagination = null;
    if (filteredHives.length > hivesPerPage) {
        pagination = (
            <div className="c-pagination">
                <button className="btn btn-outline-alternate" onClick={() => {
                    if (page-1 < 1) {
                        setPage(1)
                    } else {
                        setPage(page-1)
                    }
                }}>&lt;</button>
                <div className="c-pagination__page">{page}</div>
                <button className="btn btn-outline-alternate" onClick={() => {
                    if (isNextPage()) {
                        setPage(page+1);
                    }}}>&gt;</button>
            </div>
        )
    }
    
    if (props.hives.length > 0) {
        return (
            <div className="c-hives">
                <div className="c-hives__header">
                    <h2 className="c-hives__title">{props.title}</h2>
                    <div className="c-hives__controls">
                        <input 
                        type="search" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Search"
                        />
                        {pagination}
                    </div>
                </div>
                <div className="c-hives__collection">
                   {hives}
                </div>
            </div>
        )
    } else {
        return null
    }
}


export default HivesContainer;