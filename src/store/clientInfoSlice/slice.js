import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const clientInfo = createSlice({
  name: "clientInfo",
  initialState,
  reducers: {
    clientInfoSuccess: (state, action) => {
      state.value = action.payload;
    },
    clientInfoFailure: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { clientInfoSuccess, clientInfoFailure } = clientInfo.actions;
export default clientInfo.reducer;
