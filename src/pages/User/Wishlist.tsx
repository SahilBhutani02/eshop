import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import WishlistCard from "../../components/WishlistCard";
import { Link } from "react-router-dom";

const Wishlist:React.FC = () => {
  const wish = useSelector((state: any) => state.wishlist);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = wish?.slice(startIndex, startIndex + itemsPerPage);
  

  return (
    <div>
      {wish.length > 0 ? (
        <>
          <p className="your-cart">Wishlist Items</p>
          <div className="posts">
            {currentItems.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <WishlistCard key={wish.id} item={item} index={index} />
                </div>
              );
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={wish?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>

      ) : (
        <div className="empty">
          <p>Your Wishlist is Empty!</p>
          <button className="shop-btn">
            <Link to="/products" className="shop">Shop Now</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
