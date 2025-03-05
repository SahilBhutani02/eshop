import { createContext, useState, ReactNode } from "react";

type FilterState = {
  categories: string[];
  price: number;
  ratings: string[];
};

type FilterContextType = {
  selectedFilters: FilterState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    categories: [],
    price: 1000,
    ratings: [],
  });

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
