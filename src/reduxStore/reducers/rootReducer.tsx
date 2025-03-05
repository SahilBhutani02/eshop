import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import signupReducer from "../slices/signupSlice";
import userTypeReducer from "../slices/userTypeSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";


const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  userType: userTypeReducer,
  cart: cartReducer,
  wishlist:wishlistReducer,
  admin:{},
  user: {},
});

export default rootReducer;
