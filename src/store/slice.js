import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const clientList = createSlice({
  name: "clientList",
  initialState,
  reducers: {
    success: (state, action) => {
      state.value = action.payload;
    },
    failure: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { success, failure } = clientList.actions;
export default clientList.reducer;
