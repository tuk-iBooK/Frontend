// src/features/characterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Character {
  // story: number;
  age: number;
  gender: string;
  name: string;
  personality: string;
}

interface CharacterState {
  characters: Character[];
}

const initialState: CharacterState = {
  characters: [],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },
    removeCharacter: (state, action: PayloadAction<number>) => {
      state.characters.splice(action.payload, 1);
    },
  },
});

export const { addCharacter, removeCharacter } = characterSlice.actions;

export default characterSlice.reducer;
