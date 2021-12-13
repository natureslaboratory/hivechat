import React, { useState } from 'react'

function usePaginationWithSearch() {
    const [ totalPages, setTotalPages ] = useState<number>(null)
    const [ page, setPage ] = useState(1);
    const [ search, updateSearch ] = useState("");
    const [ skip, setSkip ] = useState(false);

    function setSearch(s: string) {
        setSkip(true);
        updateSearch(s);
    }

    function executeSearch() {
        setPage(1);
        setSkip(false);
    }

    function incrementPage() {
        if (skip) {
            setSearch("");
        }
        setSkip(false);
        if (totalPages > page) {
            setPage(page + 1);
        }
    }

    function decrementPage() {
        if (skip) {
            setSearch("");
        }
        setSkip(false);
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return {
        page,
        incrementPage,
        decrementPage,
        search,
        setSearch,
        executeSearch,
        setTotalPages,
        skip
    }
}

export default usePaginationWithSearch;