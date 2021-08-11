import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

export const { addAnswers } = answersSlice.actions;

export const getAnswers = (state: RootState) => state.answers;

export default answersSlice;
