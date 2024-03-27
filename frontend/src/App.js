import React, { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import FilterableList from "./components/FilterableList";
import DataEntryModal from "./components/DataEntryModal"; 
import axios from "axios"; 
import { useFilters } from "./hooks/FilterContext";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({}); // Data to edit, if necessary
  const { setRowData } = useFilters(); 

  const handleOpenModal = (data = {}) => {
    setModalData(data); // Set the data you might want to edit
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData({}); 
  };

  const handleSaveModalData = (data) => {

    // Check if the required fields are filled
    if (!data.name.trim() || !data.email_address.trim() || !data.applications_involved.trim() || !data.request_needed_date.trim()) {
      alert("Please fill out all required fields: Name, Email Address, and Applications Involved and Date Needed are all required fields.");
      return; // Prevent the modal from closing if validation fails
    }

    // Determine the URL and HTTP method based on the presence of an ID
    const url = modalData.id ? `${process.env.REACT_APP_SERVER_URL}requests/${modalData.id}` : `${process.env.REACT_APP_SERVER_URL}requests`;
    const method = modalData.id ? "put" : "post";
     console.log(modalData.id)
    console.log(method, url)
    

    // Make the HTTP request
    axios({
      method: method,
      url: url,
      data: {
        name: data.name,
        emailAddress: data.email_address,
        requestType: data.request_type,
        requestNeededDate: data.request_needed_date,
        applicationsInvolved: data.applications_involved,
        modelAfter: data.model_after,
        macOrPc: data.mac_or_pc,
        requestedBy: data.requested_by,
        status: data.status,
        completedBy: data.completed_by,
        ticketNumber: data.ticket_number,
        notes: data.notes,
      },
    })
      .then((response) => {
        alert("Request saved successfully!");
        handleCloseModal();
   

        // Refresh data in context
        const fetchData = async () => {
          try {
            const baseUrl = process.env.REACT_APP_SERVER_URL;
            const response = await axios.get(`${baseUrl}requests/all`, { params: {} }); // Adjust params as necessary
            setRowData(response.data);
          } catch (error) {
            console.error("Error refreshing data:", error);
          }
        };

        fetchData();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("An error occurred while saving the data. Please try again.");
      });
  };

const handleRowClick = (rowData) => {
// console.log(rowData)
  setModalData(rowData); 
  setShowModal(true); 
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
        <button className="addButton" onClick={() => handleOpenModal()}>
          Add/Edit Request
        </button>{" "}
        {/* Button to open the modal */}
        <DataEntryModal show={showModal} handleClose={handleCloseModal} handleSubmit={handleSaveModalData} initialData={modalData} />
      </div>
      <DataTable onRowClick={handleRowClick} />
    </div>
  );
}

export default App;










   
   


