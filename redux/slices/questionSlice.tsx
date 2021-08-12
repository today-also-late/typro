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

type Selected = {
  language: string;
  level: string;
};

export const updateQuestionsState = createAsyncThunk(
  "questions/updateQuestionsState",
  async (selected: Selected) => {
    const { language, level } = selected;

    const response: firebase.default.firestore.DocumentData | any = await (
      await db.collection("questions").doc(language).get()
    ).data();
    return response[level];
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateQuestionsState.fulfilled, (state, action: any) => {
      state.questions = action.payload; // payloadCreatorでreturnされた値
    });
  },
});

export const getQuestions = (state: RootState) => state.questions;

export default questionsSlice;
