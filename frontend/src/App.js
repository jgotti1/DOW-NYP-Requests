import React, { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import FilterableList from "./components/FilterableList";
import DataEntryModal from "./components/DataEntryModal"; // Import your modal component

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({}); // Data to edit, if necessary

  const handleOpenModal = (data = {}) => {
    setModalData(data); // Set the data you might want to edit
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveModalData = (data) => {
    console.log("Save data", data);
    // Here you would handle saving the data, possibly sending a PUT request
    handleCloseModal();
  };

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
      <button onClick={() => handleOpenModal()}>Add/Edit Request</button> {/* Button to open the modal */}
      <DataEntryModal show={showModal} handleClose={handleCloseModal} handleSubmit={handleSaveModalData} initialData={modalData} />
      </div>
      <DataTable />
    </div>
  );
}

export default App;
