import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import { useGetOrganisationMembersQuery } from '../../services/newApi';
import { OrganisationMemberType } from '../../services/types';


export type PaginationProps<InputType, DataType> = {
    args: InputType
    callable: {(props: InputType & { page: number, search: string }, { skip: boolean }) : ICallableResult<DataType>}
}

interface ICallableResult<DataType> {
    data?: {
        pages: number
        result: DataType[]
    }
    isLoading: boolean,
    isFetching: boolean
}

function usePagination<InputType, DataType>(props: PaginationProps<InputType, DataType>) : ITableControls & { data: DataType[],  page: number } {
    const [page, setPage] = useState(1);
    const [ search, updateSearch ] = useState("");
    const [ skip, setSkip ] = useState(false);

    let args = {
        ...props.args,
        page, 
        search
    }

    const { data, isLoading, isFetching } = props.callable(args, { skip })

    // console.log(data, isLoading, isFetching);

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
        data: data ? data.result : [],
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

export default usePagination;

