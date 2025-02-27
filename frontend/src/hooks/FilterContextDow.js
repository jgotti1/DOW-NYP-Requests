import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FilterContextDow = createContext();

export const FilterProviderDow = ({ children }) => {
  const [filtersDow, setFiltersDow] = useState({
    completed: false,
    inProgress: true,
    newRequests: true,
  });

  const [searchTermDow, setSearchTermDow] = useState("");
  const [rowDataDow, setRowDataDow] = useState([]);

  // Fetch data whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.REACT_APP_SERVER_URL; // Access the environment variable

        const response = await axios.get(`${baseUrl}dowrequests/all`, { params: filtersDow });
        setRowDataDow(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filtersDow, searchTermDow]); // Depend on filters to refetch data when they change

  // Include rowData and setRowData in the value provided to the context
 
  const value = { filtersDow, setFiltersDow, searchTermDow, setSearchTermDow, rowDataDow, setRowDataDow };


  return <FilterContextDow.Provider value={value}>{children}</FilterContextDow.Provider>;
};

// Your existing custom hook for using the filter context
export const useFiltersDow = () => {
  const context = useContext(FilterContextDow);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
