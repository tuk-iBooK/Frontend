import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import genreReducer from "../features/genreSlice";
import backgroundReducer from "../features/backgroundSlice";
import periodReducer from "../features/periodSlice";
import characterReducer from "../features/characterSlice";
import summaryReducer from "../features/summarySlice";
import storyReducer from "../features/storySlice";
// import appReducer from "../features/appSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer,
    story: storyReducer,
    background: backgroundReducer,
    period: periodReducer,
    character: characterReducer,
    summary: summaryReducer,
    choice: storyReducer,
  },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 정의
export type AppDispatch = typeof store.dispatch;

export default store;
