import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppDow from "./AppDow";
import { FilterProvider } from "./hooks/FilterContext"; // Import the FilterProvider
import { FilterProviderDow } from "./hooks/FilterContextDow"; // Import the FilterProvider
import LoginPage from "./components/LoginPage"; // Import the LoginPage component
import NavBar from "./components/NavBar"; // Import the NavBar component

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootComponent = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [admin, setAdmin] = React.useState(false)
  const [selected, setSelected] = React.useState("New York Post");

  // Function to handle successful login
  const handleLogin = (isAdmin) => {
    setAuthenticated(true);
    setAdmin(isAdmin)
    
  };




  return (
    <React.StrictMode>
      <FilterProvider>
      <FilterProviderDow>
        {/* Render LoginPage if not authenticated, otherwise render App */}
        {!authenticated && <LoginPage onLogin={handleLogin} />}
        {authenticated && <NavBar selected={selected} setSelected={setSelected} />}
        {selected === "New York Post" && authenticated && <App admin={admin} />}
        {selected === "DowJones" && authenticated && <AppDow admin={admin} />}
      </FilterProviderDow>
      </FilterProvider>
    </React.StrictMode>
  );
};

root.render(<RootComponent />);
