import { createSlice } from "@reduxjs/toolkit";

export const backgroundSlice = createSlice({
  name: "background",
  initialState: {
    selectedBackgrounds: [],
  },
  reducers: {
    setSelectedBackgrounds: (state, action) => {
      state.selectedBackgrounds = action.payload;
    },
    addBackground: (state, action) => {
      if (!state.selectedBackgrounds.includes(action.payload)) {
        state.selectedBackgrounds.push(action.payload);
      }
    },
    removeBackground: (state, action) => {
      state.selectedBackgrounds = state.selectedBackgrounds.filter(
        (genre) => genre !== action.payload
      );
    },
  },
});

export const { setSelectedBackgrounds, addBackground, removeBackground } =
  backgroundSlice.actions;

export default backgroundSlice.reducer;
