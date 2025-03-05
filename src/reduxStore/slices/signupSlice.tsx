import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",
  initialState: {},
  reducers: {
    signup: (_, action) => {
      return action.payload;
    }
  },

});

export const { signup } = signupSlice.actions;

export default signupSlice.reducer;
