import { Store, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import answersSlice, {
  initialState as answersState,
} from "./slices/answerSlice";
import userSlice, { initialState as userState } from "./slices/user/userSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  answers: answersSlice.reducer,
});

const preloadedState = () => {
  return {
    user: userState,
    answers: answersState,
  };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
  return configureStore({
    reducer: rootReducer, // rootReducerはcreateSliceで作ったReducer達をcombineReducerにより合体させたもの
    preloadedState: preloadedState(),
  });
};

export default createStore;
