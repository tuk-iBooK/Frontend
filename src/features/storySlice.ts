import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
  name: "story",
  initialState: {
    value: 0,
  },
  reducers: {
    setStory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStory } = storySlice.actions;

export default storySlice.reducer;
