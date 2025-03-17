import { useState,  useContext, createContext } from "react";


export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    result: [],
  });


  return (
    <SearchContext.Provider value={{ values, setValues }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
