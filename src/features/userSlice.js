import { createSlice } from "@reduxjs/toolkit";

const userState = {
  user: {},
};

const userSlice = createSlice({
  name: "users",
  initialState: userState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
    getUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { addUser, updateUser, getUser } = userSlice.actions;
export default userSlice.reducer;
