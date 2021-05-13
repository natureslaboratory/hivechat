import React, { useState, useEffect } from 'react';
import Hive, { HiveProps } from './Hive';

interface HivesProps {
    type : "Public" | "Private" | "Draft" | "All",
    adminPage : boolean
}

const Hives : React.FunctionComponent<HivesProps> = (props) => {
    const [page, setPage] = useState(1);
    const [hivesPerPage, setHivesPerPage] = useState(6);
    const [hives, setHives] = useState([]);
    const [filteredHives, setFilteredHives] = useState([]);
    const [slicedHives, setSlicedHives] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    let urlSlug = "";
    let urlSplit = window.location.href.split("/");
    for (let i = 0; i < urlSplit.length; i++) {
        const element = urlSplit[i];
        if (element == "organisations") {
            urlSlug = urlSplit[i+1];
        }
    } 

    useEffect(() => {
        getHives();
    }, [hives])

    useEffect(() => {
        filterHives();
    }, [searchTerm, hives])

    useEffect(() => {
        sliceHives();
    }, [page, filteredHives])

    function getHives() {
        fetch(`/page-api/organisation-hives?orgSlug=${urlSlug}&type=${props.type}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setHives(data as Array<HiveProps>)
                }
        })
    }

    function isNextPage() {
        let totalHives = hives.length;
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
            hives.filter(hive => filterBySearchTerm(hive))
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
    

    const hivesRendered = slicedHives.map(hive => <Hive {...hive} key={hive.hiveID} /> )

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
    
    if (hives.length > 0) {
        return (
            <div className="c-hives">
                <div className="c-hives__header">
                    <h2 className="c-hives__title">{props.type} Hives</h2>
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
                   {hivesRendered}
                </div>
            </div>
        )
    } else {
        return null
    }
}


export default Hives;