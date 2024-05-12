import { createSlice } from "@reduxjs/toolkit";

export const periodSlice = createSlice({
  name: "period",
  initialState: {
    selectedPeriods: [],
  },
  reducers: {
    setSelectedPeriods: (state, action) => {
      state.selectedPeriods = action.payload;
    },
    addPeriod: (state, action) => {
      if (!state.selectedPeriods.includes(action.payload)) {
        state.selectedPeriods.push(action.payload);
      }
    },
    removePeriod: (state, action) => {
      state.selectedPeriods = state.selectedPeriods.filter(
        (period) => period !== action.payload
      );
    },
  },
});

export const { setSelectedPeriods, addPeriod, removePeriod } =
  periodSlice.actions;

export default periodSlice.reducer;
