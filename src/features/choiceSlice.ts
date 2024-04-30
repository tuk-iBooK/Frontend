import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  userChoice: string;
  apiResponse: string;
}

const initialState: AppState = {
  userChoice: "",
  apiResponse: "",
};

const choiceSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserChoice(state, action: PayloadAction<string>) {
      state.userChoice = action.payload;
    },
    setApiResponse(state, action: PayloadAction<any>) {
      state.apiResponse = action.payload;
    },
  },
});

export const { setUserChoice, setApiResponse } = choiceSlice.actions;
export default choiceSlice.reducer;
