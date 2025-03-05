import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    login: (_, action) => {
      return action.payload;
    }
  },

});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
