import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import WishlistCard from "../../components/WishlistCard";
import { Link } from "react-router-dom";

const Wishlist: React.FC = () => {
  const wish = useSelector((state: any) => state.wishlist);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = wish?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen px-4 py-6">
      {wish.length > 0 ? (
        <>
          <h2 className="text-3xl font-semibold md:text-left mb-4 dark:text-white">Wishlist Items</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
            {currentItems.map((item: any,index:number) => (
              <div key={index}>
                <WishlistCard key={item.id} item={item} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalItems={wish?.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-2xl">
          <p className="mb-4 dark:text-white">Your Wishlist is Empty!</p>
          <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg transition">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
