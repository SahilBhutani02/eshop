import { useContext, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FilterContext } from "../../components/context/FilterContext";

const FilterProducts: React.FC = () => {
  const filterContext = useContext(FilterContext);
  if (!filterContext) {
    throw new Error("FilterProducts must be used within a FilterProvider");
  }

  const { setSelectedFilters } = filterContext;

  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(1000);
  const [ratings, setRatings] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
  });

  const toggleExpand = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleRatingChange = (rating: string) => {
    setRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleApply = () => {
    setSelectedFilters({ categories, price, ratings });
  };

  const handleCancel = () => {
    setCategories([]);
    setPrice(1000);
    setRatings([]);
    setSelectedFilters({ categories: [], price: 1000, ratings: [] }); 
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2 mx-12">Filter Products</h2>

      {/* Category Filter */}
      <div className="my-3">
        <p className="cursor-pointer flex justify-between" onClick={() => toggleExpand("category")}>
          Category {expanded.category ? <FaAngleUp /> : <FaAngleDown />}
        </p>
        {expanded.category && (
          <div className="my-2">
            {["men's clothing", "women's clothing", "jewelery", "electronics"].map((category) => (
              <div key={category} className="m-1">
                <input
                  type="checkbox"
                  id={category}
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category} className="ml-3 cursor-pointer">{category}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="my-3">
        <p className="cursor-pointer flex justify-between" onClick={() => toggleExpand("price")}>
          Price {expanded.price ? <FaAngleUp /> : <FaAngleDown />}
        </p>
        {expanded.price && (
          <div className="text-center text-sm my-2">
            <span className="mx-1">100</span>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <span className="mx-1">{price}</span>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="my-3">
        <p className="cursor-pointer flex justify-between" onClick={() => toggleExpand("rating")}>
          Rating {expanded.rating ? <FaAngleUp /> : <FaAngleDown />}
        </p>
        {expanded.rating && (
          <div className="my-2">
            {["0.0 - 1.0", "1.0 - 2.0", "2.0 - 3.0", "3.0 - 4.0", "4.0 - 5.0"].map((rate) => (
              <div key={rate} className="m-1">
                <input
                  type="checkbox"
                  id={rate}
                  checked={ratings.includes(rate)}
                  onChange={() => handleRatingChange(rate)}
                />
                <label htmlFor={rate} className="ml-3 cursor-pointer">{rate} Stars</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-gray-400 px-3 py-1 rounded" onClick={handleCancel}>
          Cancel
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterProducts;
