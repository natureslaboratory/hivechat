// import React from 'react';
// import { shallow } from 'enzyme';
import { renderHook, act } from '@testing-library/react-hooks';
import usePaginationWithSearch from '../usePaginationWithSearch';

describe("usePaginationWithSearch", () => {
    it("should increment", () => {
        const { result } = renderHook(() => (
            usePaginationWithSearch()
        ))
        act(() => result.current.setTotalPages(2))
        expect(result.current.page).toEqual(1);

        act(() => result.current.incrementPage());
        expect(result.current.page).toEqual(2);

        act(() => result.current.incrementPage());
        expect(result.current.page).toEqual(2);
    }),
    it("should decrement", () => {
        const { result } = renderHook(() => (
            usePaginationWithSearch()
        ))
        act(() => result.current.setTotalPages(2));
        expect(result.current.page).toEqual(1);

        act(() => result.current.incrementPage());
        expect(result.current.page).toEqual(2);

        act(() => result.current.decrementPage());
        expect(result.current.page).toEqual(1);

        act(() => result.current.decrementPage());
        expect(result.current.page).toEqual(1);
    }),
    it("should update search", () => {
        const { result } = renderHook(() => (
            usePaginationWithSearch()
        ))
        const testString = "hello";
        act(() => result.current.setSearch(testString));
        expect(result.current.search).toEqual(testString);
    }),
    it("should execute search", () => {
        const { result } = renderHook(() => (
            usePaginationWithSearch()
        ))
        const testString = "hello";
        
        expect(result.current.skip).toEqual(false)
        act(() => result.current.setSearch(testString));
        expect(result.current.skip).toEqual(true)
        act(() => result.current.executeSearch());
        expect(result.current.skip).toEqual(false)
    }),
    it("should clear search on page change if not executed", () => {
        const { result } = renderHook(() => (
            usePaginationWithSearch()
        ))
        const testString = "hello";
        act(() => result.current.setSearch(testString));
        act(() => result.current.incrementPage());
        expect(result.current.search).not.toEqual(testString);
    })
})