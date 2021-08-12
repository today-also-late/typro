import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { auth, FirebaseTimestamp, db, fb } from "../../src/firebase/firebase";
import Router from "next/router";

export type QuestionsState = {
  questions: {
    src: {
      [key: string]: string;
    };
    output: {
      [key: string]: string;
    };
  };
};

export const initialState: QuestionsState = {
  questions: {
    src: {
      "": "",
    },
    output: {
      "": "",
    },
  },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    updateQuestionsState: (state, action: any) => ({
      questions: {
        ...state,
        ...action.payload,
      } /* もとの配列を展開して新しい配列を作る */,
    }),
  },
});

export const { updateQuestionsState } = questionsSlice.actions;

export const getQuestions = (state: RootState) => state.questions;

export default questionsSlice;
