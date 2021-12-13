import React, { useState } from 'react';



function useSearch() {
    const [ search, updateSearch ] = useState("");
    const [ skip, setSkip ] = useState(false);

    function setSearch(s: string) {
        setSkip(true);
        updateSearch(s);
    }

    function executeSearch() {
        // setPage(1);
        setSkip(false);
    }

    return {
        search,
        setSearch,
        executeSearch,
        skip,
        setSkip
    }
}

export default useSearch;