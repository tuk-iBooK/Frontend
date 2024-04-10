import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import genreReducer from "../features/genreSlice";
import backgroundReducer from "../features/backgroundSlice";
import periodReducer from "../features/periodSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer,
    background: backgroundReducer,
    period: periodReducer,
  },
});

export default store;
