import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import commonSlice from "./commonSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    posts: postSlice,
    common: commonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
