import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    cartAdd(state:any, action:any){
      state.push(action.payload);
    },
    cartRemove(state:any, action:any){
      return state.filter((item:any) => item.id !== action.payload);
    },
    emptyCart() {
      return []; 
    },
  },
});

export default CartSlice.reducer;
export const { cartAdd, cartRemove, emptyCart } = CartSlice.actions;
