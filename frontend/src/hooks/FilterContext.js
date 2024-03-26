import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    completed: false,
    inProgress: true,
    newRequests: true,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [rowData, setRowData] = useState([]);

  // Fetch data whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.REACT_APP_SERVER_URL; // Access the environment variable

        const response = await axios.get(`${baseUrl}requests/all`, { params: filters });
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filters, searchTerm]); // Depend on filters to refetch data when they change

  // Include rowData and setRowData in the value provided to the context
 
  const value = { filters, setFilters, searchTerm, setSearchTerm, rowData, setRowData };


  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

// Your existing custom hook for using the filter context
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
