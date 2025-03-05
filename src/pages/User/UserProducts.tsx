import React, { useContext, useMemo } from "react";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import { FilterContext } from "../../components/context/FilterContext";

const UserProducts: React.FC = () => {
  const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const filterContext = useContext(FilterContext);


  if (!filterContext) {
    throw new Error("FilterProducts must be used within a FilterProvider");
  }

  const { selectedFilters } = filterContext;

  async function fetchProductData() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);



  const filteredData = useMemo(() => {
    return (
      posts.filter((post: any) => {
        const isPriceMatch = post?.price < selectedFilters?.price;

        const isCategoryMatch = selectedFilters?.categories?.length
          ? selectedFilters?.categories?.includes(post?.category)
          : true;

        const isRatingMatch = selectedFilters?.ratings?.length
          ? selectedFilters?.ratings?.some((range: string) => {
            const [min, max] = range.split(' - ').map(Number);
            return post?.rating?.rate >= min && post?.rating?.rate <= max;
          })
          : true;

        return isPriceMatch && isCategoryMatch && isRatingMatch;
      }) || []
    );
  }, [selectedFilters, posts]);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : filteredData?.length > 0 ? (
        <>
          <div className="posts">
            {currentItems?.map((post: any, index: any) => {
              return <ProductCard key={post.id} post={post} index={index} />;
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredData?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : (
        <div className="empty">
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default UserProducts;
