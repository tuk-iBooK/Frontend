import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import genreReducer from "../features/genreSlice";
import backgroundReducer from "../features/backgroundSlice"; // 경로에 따라 수정 필요

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer,
    background: backgroundReducer, // backgroundSlice.reducer를 추가
  },
});

export default store;
