import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd, cartRemove } from "../reduxStore/slices/cartSlice";
import { wishRemove } from "../reduxStore/slices/wishlistSlice";
import { useNavigate } from "react-router-dom";

interface WishlistCardProps {
  item: any;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const cart = useSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(cartRemove(item.id));
  };

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(cartAdd(item));
  };

  const removeFromWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(wishRemove(item.id));
  };

  const title = item.title.length > 40 ? `${item.title.substring(0, 40)}...` : item.title;

  const handleProduct = () => {
    navigate(`/products/${item.id}`, { state: item });
  };

  return (
    <div 
      className=" w-full dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
      onClick={handleProduct}
    >
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-semibold truncate dark:text-white">{title}</p>
        <button onClick={removeFromWishlist} className="text-red-500 hover:text-red-700">
          <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
          </svg>
        </button>
      </div>

      <div className="flex justify-center">
        <img className="w-40 h-40 object-contain" src={item.image} alt="wishlist-item" />
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-green-600 text-lg font-semibold dark:text-white">${item.price}</p>
        {cart.some((p: any) => p.id === item.id) ? (
          <button 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            onClick={removeFromCart}
          >
            Remove
          </button>
        ) : (
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistCard;
