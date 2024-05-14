import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Page {
  pageId: number;
  title?: string;
  content: string;
  choices: string[];
  imageUrl?: string;
}

interface Choice {
  pageId: number;
  userChoice: string;
}

interface StoryState {
  value: number; /// 현재 활성화된 스토리 ID
  pages: Page[]; // 해당 스토리의 페이지 목록
  pageId: number; // 현재 스토리의 마지막 페이지 번호 (순차적 증가)
  choices: Choice[];
}

export const storySlice = createSlice({
  name: "story",
  initialState: {
    value: 0,
    pages: [] as Page[],
    pageId: 0, // 초기 페이지 번호
    choices: [] as Choice[],
  },
  reducers: {
    setStory: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      state.pages = [];
      state.pageId = 0; // 스토리가 바뀔 때마다 페이지 번호를 리셋
    },
    addPage: (state, action: PayloadAction<Omit<Page, "pageId">>) => {
      const newPageId = state.pageId + 1; // 다음 페이지 ID
      state.pages.push({ pageId: newPageId, ...action.payload });
      state.pageId = newPageId; // 페이지 번호 업데이트
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
    setImage: (
      state,
      action: PayloadAction<{ pageId: number; imageUrl: string }>
    ) => {
      const page = state.pages.find(
        (page) => page.pageId === action.payload.pageId
      );
      if (page) {
        page.imageUrl = action.payload.imageUrl;
      }
    },
  },
});

export const { setStory, addPage, updatePage, addUserChoice, setImage } =
  storySlice.actions;

export default storySlice.reducer;
