import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StoryState {
  id: number;
  userChoices: string[];
  title?: string;
  content: string;
  choices: string[];
}

const initialState: StoryState = {
  id: 0,
  userChoices: [],
  title: "",
  content: "",
  choices: [],
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    addUserChoice(state, action: PayloadAction<string>) {
      state.userChoices.push(action.payload);
    },
    updateStory(
      state,
      action: PayloadAction<{
        title?: string;
        content: string;
        choices: string[];
      }>
    ) {
      if (action.payload.title !== undefined) {
        state.title = action.payload.title;
      }
      state.content = action.payload.content;
      state.choices = action.payload.choices;
    },
  },
});

export const { addUserChoice, updateStory } = storySlice.actions;
export default storySlice.reducer;
