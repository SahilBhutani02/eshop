import { createSlice } from "@reduxjs/toolkit";

export const WishSlice = createSlice({
  name: "wish",
  initialState: [],
  reducers: {
    wishAdd: (state:any, action:any) => {
      state.push(action.payload);
    },
    wishRemove: (state:any, action:any) => {
      return state.filter((item:any) => item.id !== action.payload);
    },
    emptyWish() {
      return []; 
    },
  },
});


export default WishSlice.reducer;
export const { wishAdd, wishRemove, emptyWish } = WishSlice.actions;
