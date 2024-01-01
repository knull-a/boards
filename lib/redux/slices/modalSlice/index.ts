import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: {
      isOpen: false,
    },
  } as InitialState,
  reducers: {
    onOpen: (state, action) => {
      state.value.isOpen = true;
      state.value.id = action.payload;
    },
    onClose: (state) => {
      state.value.isOpen = false;
      state.value.id = undefined;
    },
  },
});

export const { onOpen, onClose } = modalSlice.actions;

export default modalSlice.reducer;
