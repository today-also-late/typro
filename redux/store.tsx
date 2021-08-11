// import { Store, combineReducers } from "redux";
// // import logger from "redux-logger";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import answersSlice, {
//   initialState as answersState,
// } from "./slices/answerSlice";

// const rootReducer = combineReducers({
//   answers: answersSlice.reducer,
// });

// const preloadedState = () => {
//   return { answers: answersState };
// };

// export type StoreState = ReturnType<typeof preloadedState>;

// export type ReduxStore = Store<StoreState>;

// const createStore = () => {
//   // const middlewareList = [...getDefaultMiddleware(), logger];

//   return configureStore({
//     reducer: rootReducer,
//     // middleware: middlewareList,
//     devTools: process.env.NODE_ENV !== "production",
//     preloadedState: preloadedState(),
//   });
// };

// export default createStore;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import answersSlice from "./slices/answersSlice";
import questionsSlice from "./slices/questionSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    answers: answersSlice.reducer,
    user: userSlice.reducer,
    questions: questionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
