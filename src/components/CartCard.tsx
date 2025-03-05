import React from "react";
import { useDispatch } from "react-redux";
import { cartRemove } from "../reduxStore/slices/cartSlice";
import { useNavigate } from "react-router-dom";

interface CartCardProps {
  item: any; 
  index: number;
}

const CartCard: React.FC<CartCardProps> = ({ item, index }) => {

  const description = `${item.description.length > 200 ? `${item.description.substring(0, 200)}...` : `${item.description.substring(0, 200)}`}`;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const removeFromCart = (e: any) => {
    e.stopPropagation()
    dispatch(cartRemove(item.id))
  }

  const handleProduct = () => {
    navigate(`/products/${item?.id}`, {state:item})
  }
  return (
    <div className="cart-left dark:bg-gray-800 cursor-pointer" key={index} onClick={handleProduct}>
      <div className="cart-image dark:bg-gray-800">
        <img src={item.image} className="cart-img dark:bg-gray-800" alt="cart-item" />
      </div>
      <div className="cart-item-details">
        <h2 className="cart-title dark:text-white">{item.title}</h2>
        <p className="cart-desc dark:text-white">{description}</p>
        <div className="cart-bottom">
          <p className="cart-price dark:text-white">${item.price}</p>
          <button className="delete-btn" onClick={(e) => removeFromCart(e)}><svg className="cart-del-btn " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
