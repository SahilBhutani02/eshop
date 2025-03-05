import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartCard from "../../components/CartCard";
import { Link } from "react-router-dom";

const Cart:React.FC = () => {
  const cart = useSelector((state: any) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc: any, curr: any) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div>
      {cart.length > 0 ? (
        <div className="cart">
          <div>
            <p className="your-cart">Cart Items</p>
            <>
              {cart.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    <CartCard key={cart.id} item={item} index={index} />
                  </div>
                );
              })}
            </>
          </div>
          <div className="cart-right dark:bg-gray-800 ">
            <div className="cart-right-top">
              <p className="summary dark:text-white"> Summary</p>
              <p className="total-items dark:text-white">
                Total Items:<span className="no-items">{cart.length}</span>
              </p>
              <p className="total-amount dark:text-white">
                Total Amount:<span className="no-amount">${totalAmount}</span>
              </p>
            </div>
            <div className="cart-right-bottom">
              <p className="total-amount-payable">
                Pay:<span className="no-amount">${totalAmount}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty">
          <p>Your Cart is Empty!</p>
          <button className="shop-btn">
            <Link to="/products" className="shop">Shop Now</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
