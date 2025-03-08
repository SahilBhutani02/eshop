import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartCard from "../../components/CartCard";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const cart = useSelector((state: any) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc: any, curr: any) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="p-4">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row lg:justify-between gap-3">

          <div className="w-full lg:w-3/4">
            <p className="text-2xl md:text-3xl font-semibold mx-4 my-2.5">Cart Items</p>
            {cart.map((item: any, index: any) => (
              <CartCard key={item.id} item={item} index={index} />
            ))}
          </div>


          <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 lg:mt-[60px] shadow-lg rounded-2xl p-6 flex flex-col justify-between mb-[15px]">
            <div>
              <p className="text-xl font-bold mb-4 dark:text-white">Summary</p>
              <p className="text-lg mb-2 dark:text-white">
                Total Items: <span className="text-xl font-semibold pl-1">{cart.length}</span>
              </p>
              <p className="text-lg mb-2 dark:text-white">
                Total Amount: <span className="text-xl font-semibold pl-1">${totalAmount}</span>
              </p>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-4 text-lg">
              Pay: ${totalAmount}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-lg md:text-2xl font-semibold mb-4">Your Cart is Empty!</p>
          <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-lg">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
