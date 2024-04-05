// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import genreReducer from "..//features/genreSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer, // genreSlice.reducer를 추가
  },
});

export default store;
