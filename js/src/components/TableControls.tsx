import React from 'react';
import { ITableControls } from '../hooks/useGetPaginatedOrganisationMembers';
import Button from './Button';

const TableControls: React.FC<ITableControls> = (props) => {
    const {
        search, 
        setSearch, 
        executeSearch, 
        decrementPage, 
        incrementPage,
        page,
        isLoading,
        isFetching,
        hasMoreData
    } = props;
    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div>
                <label htmlFor="search" className="hidden">Search</label>
                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)}
                    style={
                        {
                            height: "100%",
                            padding: "0 0.4rem",
                            borderRadius: "0.25rem 0 0 0.25rem",
                            border: "1px solid #ababab",
                            borderRight: "none"
                        }
                    }
                    type="text"
                    placeholder="Search..."
                    name="search"
                />
                <Button onClick={executeSearch} label="Go" type="primary" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyContent: "center", alignItems: "center" }}>
                <Button label="<" type="alternate" disabled={page <= 1} onClick={decrementPage} />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{isLoading || isFetching ? "." : page}</div>
                <Button label=">" type="alternate" disabled={!hasMoreData} onClick={incrementPage} />
            </div>
        </div>
    )
}

export default TableControls;