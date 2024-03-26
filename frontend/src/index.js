import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./hooks/FilterContext"; // Import the FilterProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FilterProvider>
      {/* Wrap the App component with FilterProvider */}
      <App />
    </FilterProvider>
  </React.StrictMode>
);
