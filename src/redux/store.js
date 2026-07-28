import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slaces/categoriesSlace";
import wordsReducer from "./slaces/wordSlice";
import authReducer from "./slaces/authSlace";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    words: wordsReducer,
  },
});
