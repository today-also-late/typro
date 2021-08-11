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
import answersSlice, {
  initialState as answersState,
} from "./slices/answerSlice";
<<<<<<< HEAD
import userReducer from "./slices/userSlice";
=======
import userReducer, { userSlice } from "./slices/user/userSlice";
>>>>>>> test

export const store = configureStore({
  reducer: {
    answers: answersSlice.reducer,
<<<<<<< HEAD
    user: userReducer,
=======
    user: userSlice.reducer,
>>>>>>> test
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
