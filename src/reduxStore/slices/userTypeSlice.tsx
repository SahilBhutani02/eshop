import { createSlice } from "@reduxjs/toolkit";

const userTypeSlice = createSlice({
  name: "userType",
  initialState: { admin: false, user: false },
  reducers: {
    userType: (state, action) => {
      state.admin = action.payload.admin;
      state.user = action.payload.user;
    },
  },
});

export const { userType } = userTypeSlice.actions;
export default userTypeSlice.reducer;
