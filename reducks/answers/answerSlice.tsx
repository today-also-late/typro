import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AnswersState = {
  answers: string[];
};

export const initialState: AnswersState = {
  answers: [],
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswers: (state, action: PayloadAction<string>) => ({
      answers: [
        ...state.answers,
        action.payload,
      ] /* もとの配列を展開して新しい配列を作る */,
    }),
  },
});

export default answersSlice;
