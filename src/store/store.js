import { configureStore } from "@reduxjs/toolkit";
import clientListReducer from "./slice";
import clientInfoReducer from "./clientInfoSlice/slice";

export const store = configureStore({
  reducer: {
    clientList: clientListReducer,
    clientInfo: clientInfoReducer,
  },
});
