import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  userChoices: string[];
  title: string;
  content: string;
  choices: string[];
}

const initialState: AppState = {
  userChoices: [],
  title: "",
  content: "",
  choices: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addUserChoice(state, action: PayloadAction<string>) {
      state.userChoices.push(action.payload);
    },
    updateStory(
      state,
      action: PayloadAction<{
        title: string;
        content: string;
        choices: string[];
      }>
    ) {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.choices = action.payload.choices;
    },
  },
});

export const { addUserChoice, updateStory } = appSlice.actions;
export default appSlice.reducer;
