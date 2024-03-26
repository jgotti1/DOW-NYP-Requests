filterable list code to add...

import React, { useState } from 'react';
import { useFilters } from './FilterContext'; // Import useFilters
// Import other necessary components and styles...

const FilterableList = () => {
  const { filters, setFilters } = useFilters(); // Use the context
  const [searchTerm, setSearchTerm] = useState('');

  // Rest of your component logic remains the same...
};


datatable code change 


import React, { useEffect, useState } from 'react';
import { useFilters } from './FilterContext'; // Import useFilters
// Import other necessary components and styles...

const DataTable = () => {
  const { filters } = useFilters(); // Use the context
  const [data, setData] = useState([]); // State to hold your data

  useEffect(() => {
    // Fetch data from the database
    // For demonstration, let's assume the fetched data is stored in `fetchedData`
    const fetchedData = []; // Replace this with your actual fetch logic

    // Apply filters to the fetched data
    const filteredData = fetchedData.filter(request => {
      // Assuming the `status` in your data matches the filter keys
      // Adjust this logic based on your actual data structure
      return filters[request.status];
    });

    setData(filteredData);
  }, [filters]); // Re-run this effect when filters change

  // Rest of your component logic to display the data...
};
