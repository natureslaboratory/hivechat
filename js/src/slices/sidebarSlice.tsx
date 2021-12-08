import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: "question",
    initialState: window.innerWidth > 1400 ? true : false,
    reducers: {
        toggle: (state) => (state ? false : true),
        open: () => true,
        close: () => false
    }
})

export const { toggle, open, close } = sidebarSlice.actions;

export default sidebarSlice.reducer;