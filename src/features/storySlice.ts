import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Page {
  pageId: number;
  title?: string;
  content: string;
  choices: string[];
}

interface Choice {
  pageId: number;
  userChoice: string;
}

interface StoryState {
  value: number; // 이 부분은 story ID를 저장하는 상태
  pages: Page[]; // 페이지 정보를 저장하는 배열
  choices: Choice[];
}

export const storySlice = createSlice({
  name: "story",
  initialState: {
    value: 0,
    pages: [] as Page[],
    choices: [] as Choice[],
  },
  reducers: {
    setStory: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    addPage: (state, action: PayloadAction<Page>) => {
      state.pages.push(action.payload);
    },
    updatePage: (state, action: PayloadAction<Page>) => {
      const index = state.pages.findIndex(
        (page) => page.pageId === action.payload.pageId
      );
      if (index !== -1) {
        state.pages[index] = { ...state.pages[index], ...action.payload };
      }
    },
    addUserChoice(state, action: PayloadAction<Choice>) {
      const existingChoiceIndex = state.choices.findIndex(
        (choice) => choice.pageId === action.payload.pageId
      );
      if (existingChoiceIndex !== -1) {
        // 이미 해당 페이지에 대한 선택이 있다면 업데이트
        state.choices[existingChoiceIndex].userChoice =
          action.payload.userChoice;
      } else {
        // 새로운 선택 추가
        state.choices.push(action.payload);
      }
    },
  },
});

export const { setStory, addPage, updatePage, addUserChoice } =
  storySlice.actions;

export default storySlice.reducer;
