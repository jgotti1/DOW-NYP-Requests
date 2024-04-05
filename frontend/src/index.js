import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./hooks/FilterContext"; // Import the FilterProvider
import LoginPage from "./components/LoginPage"; // Import the LoginPage component

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootComponent = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <React.StrictMode>
      <FilterProvider>
        {/* Render LoginPage if not authenticated, otherwise render App */}
        {authenticated ? <App /> : <LoginPage onLogin={handleLogin} />}
      </FilterProvider>
    </React.StrictMode>
  );
};

root.render(<RootComponent />);
