import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        showLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

export const { showLoading } = loadingSlice.actions;
export default loadingSlice.reducer;