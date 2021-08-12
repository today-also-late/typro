import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AnswersState = {
  answers: {
    src: string[];
    output: string[];
  };
};

export const initialState: AnswersState = {
  answers: {
    src: [],
    output: [],
  },
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addSrcAnswers: (state, action: PayloadAction<string>) => ({
      answers: {
        src: [...state.answers.src, action.payload],
        output: [],
        /* もとの配列を展開して新しい配列を作る */
      },
    }),
    emptyAnswers: () => ({
      answers: {
        src: [],
        output: [],
        /* もとの配列を展開して新しい配列を作る */
      },
    }),
    addOutputAnswers: (state, action: PayloadAction<string>) => ({
      answers: {
        src: [...state.answers.src],
        output: [...state.answers.output, action.payload],
        /* もとの配列を展開して新しい配列を作る */
      },
    }),
    emptyOutputAnswers: (state) => ({
      answers: {
        src: [...state.answers.src],
        output: [],
        /* もとの配列を展開して新しい配列を作る */
      },
    }),
  },
});

export const {
  addSrcAnswers,
  emptyAnswers,
  addOutputAnswers,
  emptyOutputAnswers,
} = answersSlice.actions;

export const getAnswers = (state: RootState) => state.answers;

export default answersSlice;
