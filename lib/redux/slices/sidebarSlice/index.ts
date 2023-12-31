import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    value: {
      isOpen: false,
    },
  } as InitialState,
  reducers: {
    onOpen: (state) => {
      state.value.isOpen = true;
    },
    onClose: (state) => {
      state.value.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = sidebarSlice.actions;
export default sidebarSlice.reducer;
