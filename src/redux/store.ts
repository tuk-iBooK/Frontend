import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import genreReducer from "../features/genreSlice";
import backgroundReducer from "../features/backgroundSlice";
import periodReducer from "../features/periodSlice";
import characterReducer from "../features/characterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer,
    background: backgroundReducer,
    period: periodReducer,
    character: characterReducer,
  },
});

export default store;
