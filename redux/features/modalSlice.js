import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  loading: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    onLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { onOpen, onClose, onLoading } = modalSlice.actions;
export default modalSlice.reducer;
