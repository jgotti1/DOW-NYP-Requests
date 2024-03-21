import "./App.css";
import DataTable from "./components/DataTable";


function App() {
  return (
    <div className="App">
      <div className="head-container">
        <img src="/images/nyplogo.png" alt="NYP LOGO" />
        <h4 className="anton-regular">Requests</h4>
      </div>
      <DataTable/>
    </div>
  );
}

export default App;
