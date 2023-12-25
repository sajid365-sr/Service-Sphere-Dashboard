import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@/redux/features/modalSlice";

export const store = configureStore({
  reducer: {
    modalReducer,
  },
});
