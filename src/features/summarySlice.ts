// src/redux/slices/summarySlice.js
import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    value: "",
  },
  reducers: {
    setSummary: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSummary } = summarySlice.actions;

export default summarySlice.reducer;
