import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    userData: null, // Default state
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; // Update the userData state
    },
    clearUserData: (state) => {
      state.userData = null; // Clear the userData
    },
  },
});

export const { setUserData, clearUserData } = dataSlice.actions;

export default dataSlice.reducer;
