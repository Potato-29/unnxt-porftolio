import { configureStore } from "@reduxjs/toolkit";
import clientListReducer from "./slice";
export const store = configureStore({
  reducer: {
    clientList: clientListReducer,
  },
});
