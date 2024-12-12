import { createSlice } from "@reduxjs/toolkit";

const postState = {
    addPost: {},
    allPosts: []
};

const postSlice = createSlice({
    name: "post",
    initialState: postState,
    reducers: {
        CreatePost: (state, { payload }) => {
            state.addPost = payload;
        },
        GetPosts: (state, { payload }) => {
            state.allPosts = payload;
        },
    },
});

export const { CreatePost, GetPosts } = postSlice.actions;
export default postSlice.reducer;
