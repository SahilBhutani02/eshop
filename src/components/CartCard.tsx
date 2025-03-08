import React from "react";
import { useDispatch } from "react-redux";
import { cartRemove } from "../reduxStore/slices/cartSlice";
import { useNavigate } from "react-router-dom";

interface CartCardProps {
  item: any; 
  index: number;
}

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const description = item.description.length > 200 ? `${item.description.substring(0, 200)}...` : item.description;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(cartRemove(item.id));
  };

  const handleProduct = () => {
    navigate(`/products/${item?.id}`, { state: item });
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center bg-white lg:h-[250px] dark:bg-gray-800 w-full  mx-auto my-4 p-4 rounded-2xl shadow-lg cursor-pointer"
      onClick={handleProduct}
    >
      <div className="flex-shrink-0">
        <img src={item.image} className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover" alt="cart-item" />
      </div>

      <div className="flex flex-col md:ml-4 flex-grow">
        <h2 className="font-semibold text-lg md:text-xl mb-2 dark:text-white">{item.title}</h2>
        <p className="text-sm md:text-base dark:text-gray-300">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-green-600 dark:text-white">${item.price}</p>
          <button onClick={removeFromCart} className="hover:bg-red-100 p-2 rounded-full">
            <svg className="fill-red-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
