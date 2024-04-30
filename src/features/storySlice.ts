import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface StoryState {
//   value: number; // 이 부분이 story 아이디를 저장하는 상태
// }

export const storySlice = createSlice({
  name: "story",
  initialState: {
    value: 0,
  },
  reducers: {
    setStory: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setStory } = storySlice.actions;

export default storySlice.reducer;
