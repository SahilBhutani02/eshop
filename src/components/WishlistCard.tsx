import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd, cartRemove } from "../reduxStore/slices/cartSlice";
import { wishRemove } from "../reduxStore/slices/wishlistSlice";
import { useNavigate } from "react-router-dom";

interface WishlistCardProps {
  item: any;
  index: number;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item, index }) => {
  const cart = useSelector((state: any) => state.cart);

  const navigate = useNavigate()

  const dispatch = useDispatch();

  function removeFromCart(e: any) {
    e.stopPropagation()
    dispatch(cartRemove(item.id));
  }

  function addToCart(e: any) {
    e.stopPropagation()
    dispatch(cartAdd(item));
  }

  function removeFromWishlist(e: any) {
    e.stopPropagation()
    dispatch(wishRemove(item.id));
  }

  const title = `${item.title.length > 40 ? `${item.title.substring(0, 40)}...` : `${item.title.substring(0, 40)}`}`;

  const handleProduct = () => {
    navigate(`/products/${item?.id}`, { state: item })
  }

  return (
    <div className="wishlist-post dark:bg-gray-800 dark:border-gray-800 cursor-pointer" key={index} onClick={handleProduct}>
      <div className="post-top">
        <p className="title dark:text-white">{title}</p>
        <div className="wishlist">
          <button onClick={(e) => removeFromWishlist(e)}>
            <svg className="remove-wishlist" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
          </button>
        </div>
      </div>
      <div className="post-middle">
        <img className="img" src={item.image} alt="wishlist-item" />
      </div>
      <div className="post-bottom ">
        <p className="price dark:text-white">${item.price}</p>
        <div>
          {cart.some((p: any) => p.id == item.id) ? (
            <button className="remove-btn" onClick={(e) => removeFromCart(e)}>
              Remove
            </button>
          ) : (
            <button className="add-btn" onClick={(e) => addToCart(e)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
