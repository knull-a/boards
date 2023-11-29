import { createSlice } from "@reduxjs/toolkit";

type SidebarState = {
  isOpen: boolean;
};

type InitialState = {
  value: SidebarState;
};

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
