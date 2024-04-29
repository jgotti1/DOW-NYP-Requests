import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./hooks/FilterContext"; // Import the FilterProvider
import LoginPage from "./components/LoginPage"; // Import the LoginPage component

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootComponent = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [admin, setAdmin] = React.useState(false)
  

  // Function to handle successful login
  const handleLogin = (isAdmin) => {
    setAuthenticated(true);
    setAdmin(isAdmin)
    
  };


  return (
    <React.StrictMode>
      <FilterProvider>
        {/* Render LoginPage if not authenticated, otherwise render App */}
        {authenticated ? <App admin={admin} /> : <LoginPage onLogin={handleLogin} />}
      </FilterProvider>
    </React.StrictMode>
  );
};

root.render(<RootComponent />);
