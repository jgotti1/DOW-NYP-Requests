import React, { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import FilterableList from "./components/FilterableList";
import DataEntryModal from "./components/DataEntryModal";
import axios from "axios";
import ExportToExcel from "./components/ExportToExcel"; // Import the ExportToExcel component
// import emailjs from "@emailjs/browser";

import { useFilters } from "./hooks/FilterContext";

function App({ admin }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({}); // Data to edit, if necessary
  const { rowData, setRowData } = useFilters();
  const [modalVersion, setModalVersion] = useState(0);

  const version = "3.2 PROD";

  // const sendEmail = (data) => {
  //   emailjs.init({ publicKey: "2gjhU6P4iBDT3ySYw" });

  //   // Prepare the template parameters using the data object
  //   const templateParams = {
  //     name: data.name,
  //     emailAddress: data.email_address,
  //     requestType: data.request_type,
  //     requestNeededDate: data.request_needed_date,
  //     applicationsInvolved: data.applications_involved,
  //     modelAfter: data.model_after,
  //     macOrPc: data.mac_or_pc,
  //     requestedBy: data.requested_by,
  //     status: data.status,
  //     completedBy: data.completed_by,
  //     ticketNumber: data.ticket_number,
  //     notes: data.notes,
  //     reply_to: 'No Reply'
  //   };
  // console.log(templateParams)
  //   // Send the email with the template parameters
  //   emailjs.send("service_a63rcnu", "template_nn8hwxg", templateParams).then(
  //     (result) => {
  //       console.log(result);
  //     },
  //     (error) => {
  //       console.log(error.text);
  //       alert(JSON.stringify(error));
  //     }
  //   );

  // };

  const handleOpenModal = (data = {}) => {
    setModalData(data); // Set the data you might want to edit
    setShowModal(true);
  };
  console.log(`app ${admin}`);
  const handleCloseModal = () => {
    setShowModal(false);
    setModalData({});
  };

  // NEW: copy flow driven by id
const toPayload = (r = {}) => ({
  name: r.name ?? r.Name ?? "",
  emailAddress: r.email_address ?? r.emailAddress ?? "",
  requestType: r.request_type ?? r.requestType ?? "New Hire",
  requestNeededDate: r.request_needed_date ?? r.requestNeededDate ?? "",
  applicationsInvolved: r.applications_involved ?? r.applicationsInvolved ?? "",
  modelAfter: r.model_after ?? r.modelAfter ?? "",
  macOrPc: r.mac_or_pc ?? r.macOrPc ?? "",
  requestedBy: r.requested_by ?? r.requestedBy ?? "",
  status: "New", // ← force
  completedBy: "", 
  ticketNumber: "", // ← force blank
  notes: "", // ← force blank
});


  
  const handleCopy = async (id) => {
    if (!id) return;
    try {
      const baseUrl = process.env.REACT_APP_SERVER_URL;

      const { data: original } = await axios.get(`${baseUrl}requests/${id}`);
      const payload = toPayload(original);
      const postRes = await axios.post(`${baseUrl}requests`, payload);

      const newId = postRes?.data?.requestId ?? postRes?.data?.id ?? postRes?.data?._id ?? postRes?.data?.insertId;

      if (!newId) {
        console.log("POST /requests response:", postRes.data, postRes.headers);
        throw new Error("Backend did not return new record id");
      }

      // Get canonical created record
      const { data: createdRecord } = await axios.get(`${baseUrl}requests/${newId}`);

      // Seed modal — but force your desired resets
      const seed = {
        id: String(newId),
        name: createdRecord.name ?? payload.name,
        email_address: createdRecord.email_address ?? createdRecord.emailAddress ?? payload.emailAddress,
        request_type: createdRecord.request_type ?? createdRecord.requestType ?? payload.requestType,
        request_needed_date: ((d) => (d ? new Date(d).toISOString().split("T")[0] : ""))(
          createdRecord.request_needed_date ?? createdRecord.requestNeededDate ?? payload.requestNeededDate
        ),
        applications_involved: createdRecord.applications_involved ?? createdRecord.applicationsInvolved ?? payload.applicationsInvolved,
        model_after: createdRecord.model_after ?? createdRecord.modelAfter ?? payload.modelAfter,
        mac_or_pc: createdRecord.mac_or_pc ?? createdRecord.macOrPc ?? payload.macOrPc,
        requested_by: createdRecord.requested_by ?? createdRecord.requestedBy ?? payload.requestedBy,

        // force resets:
        status: "New",
        completed_by: "",
        ticket_number: "", // force blank
        notes: "", // force blank
      };

      setModalData(seed);
      setModalVersion((v) => v + 1); // if you’re using the key re-mount trick
      setShowModal(true);

      // refresh table
      const { data: all } = await axios.get(`${baseUrl}requests/all`);
      setRowData(all);
    } catch (err) {
      console.error("Error copying record:", err);
      alert("Could not copy the record. Please try again.");
    }
  };


  const handleSaveModalData = (data) => {
    // Check if the required fields are filled
    if (!data.name.trim() || !data.email_address.trim() || !data.applications_involved.trim() || !data.request_needed_date.trim() || !data.mac_or_pc.trim()) {
      alert("Please fill out all required fields: Name, Email Address, and Applications Involved, Device, and Date Needed are all required fields.");
      return; // Prevent the modal from closing if validation fails
    }

    // Determine the URL and HTTP method based on the presence of an ID
    const url = modalData.id ? `${process.env.REACT_APP_SERVER_URL}requests/${modalData.id}` : `${process.env.REACT_APP_SERVER_URL}requests`;
    const method = modalData.id ? "put" : "post";
    //  console.log(modalData.id)
    // console.log(method, url)

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

        // if (data.status === 'New') {
        //    sendEmail(data);
        // }

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

  const handleRowClickNoAdmin = () => {
    return;
  };

  const handleDelete = (id) => {
    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this request?");
    const isConfirmed2 = window.confirm("You are about to remove this request from the databae, there is no going back...");

    if (!isConfirmed || !isConfirmed2) {
      // If the user clicked "Cancel", exit the function without deleting
      return;
    }

    const url = `${process.env.REACT_APP_SERVER_URL}requests/${id}`;

    axios
      .delete(url)
      .then(() => {
        alert("Entry deleted successfully!");

        // Update state to reflect deletion
        const updatedData = rowData.filter((item) => item.id !== id);
        setRowData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
        alert("An error occurred while deleting the entry. Please try again.");
      });

    handleCloseModal();
  };

  return (
    <div className="App">
      {admin ? (
        <div className="sticky-header">
          <div className="head-container">
            <div className="center-content">
              <img src="/images/nyplogo.png" alt="NYP LOGO" />
              <h4 className="anton-regular">Requests</h4>
            </div>
            <h5 className="version">{version}</h5>
          </div>
          <div className="filter-list-div">
            <FilterableList />
            <h5 style={{ fontSize: "small", fontStyle: "italic", display: "inline-block", marginRight: "15px" }}>* Click on any record to change status or update</h5>
            <button className="addButton" onClick={() => handleOpenModal()}>
              Add/Edit Request
            </button>
            <ExportToExcel data={rowData} />
            <DataEntryModal
              key={modalVersion}
              admin={admin}
              show={showModal}
              handleClose={handleCloseModal}
              handleCopy={handleCopy}
              handleSubmit={handleSaveModalData}
              initialData={modalData}
              handleDelete={handleDelete}
            />
          </div>
          <DataTable onRowClick={handleRowClick} />
        </div>
      ) : (
        <div className="sticky-header">
          <div className="head-container">
            <div className="center-content">
              <img src="/images/nyplogo.png" alt="NYP LOGO" />
              <h4 className="anton-regular">PAS Workorder Request</h4>
            </div>
            <h5 className="version">{version}</h5>
          </div>
          <div className="filter-list-div">
            <FilterableList />
            <button className="addButton" onClick={() => handleOpenModal()}>
              Add New Request
            </button>
            <ExportToExcel data={rowData} />
            <DataEntryModal
              key={modalVersion}
              show={showModal}
              handleClose={handleCloseModal}
              handleCopy={handleCopy}
              handleSubmit={handleSaveModalData}
              initialData={modalData}
              handleDelete={handleDelete}
            />
          </div>
          <DataTable onRowClick={handleRowClickNoAdmin} />
        </div>
      )}
    </div>
  );
}

export default App;
