import "./App.css";
import DataTable from "./components/DataTable";
import FilterableList from "./components/FilterableList";

function App() {
  return (
    <div className="App">
      <div className="head-container">
        <div className="center-contentx">
          <img src="/images/nyplogo.png" alt="NYP LOGO" />
          <h4 className="anton-regular">Requests</h4>
        </div>
      </div>
      <div className="filter-list-div">
        <FilterableList />
      </div>
      <DataTable />
    </div>
  );
}

export default App;
