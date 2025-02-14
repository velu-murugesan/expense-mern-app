import { createSlice } from "@reduxjs/toolkit";

//!Initial State
const initialState = {
  user: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Store token
    },
    logoutAction: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo"); // Remove token
    },
  },
});

//! Generate actions
export const { loginAction, logoutAction } = authSlice.actions;

//! Generate the reducers
const authReducer = authSlice.reducer;
export default authReducer;
