import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import { useGetOrganisationMembersQuery } from '../services/newApi';
import { OrganisationMemberType } from '../services/types';


type PaginationProps = {
    slug: string,
}

const useGetPaginatedOrganisationMembers = (props: PaginationProps) : ITableControls & { members: OrganisationMemberType[] } => {
    const [page, setPage] = useState(1);
    const [ search, updateSearch ] = useState("");
    const [ skip, setSkip ] = useState(false);
    const { data, isLoading, isFetching } = useGetOrganisationMembersQuery({ slug: props.slug, page, search }, { skip })

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
        if (data && data.pages > page) {
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
        members: data ? data.members : [], 
        page, 
        decrementPage, 
        incrementPage, 
        isLoading, 
        isFetching, 
        hasMoreData: data && data.pages > page, 
        search,
        setSearch,
        executeSearch
    }
}

export interface ITableControls {
    page: number;
    decrementPage: () => void;
    incrementPage: () => void;
    isLoading: boolean;
    isFetching: boolean;
    hasMoreData: boolean;
    search: string;
    setSearch: (s: string) => void;
    executeSearch: () => void;
}

export default useGetPaginatedOrganisationMembers;

