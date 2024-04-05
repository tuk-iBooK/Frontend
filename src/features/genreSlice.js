import { createSlice } from "@reduxjs/toolkit";

export const genreSlice = createSlice({
  name: "genre",
  initialState: {
    selectedGenres: [],
  },
  reducers: {
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    addGenre: (state, action) => {
      if (!state.selectedGenres.includes(action.payload)) {
        state.selectedGenres.push(action.payload);
      }
    },
    removeGenre: (state, action) => {
      state.selectedGenres = state.selectedGenres.filter(
        (genre) => genre !== action.payload
      );
    },
  },
});

export const { setSelectedGenres, addGenre, removeGenre } = genreSlice.actions;

export default genreSlice.reducer;
