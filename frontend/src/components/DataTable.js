import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFilters } from "../hooks/FilterContext";



function DataTable({ onRowClick }) {
  const { rowData, filters, searchTerm } = useFilters(); // Use the custom hook to access rowData

const filteredRowData = rowData.filter((row) => {
  const term = searchTerm.toLowerCase();
  const dateEnteredString = new Date(row.date_entered).toLocaleString().toLowerCase();
  const dateNeededString = new Date(row.request_needed_date).toLocaleDateString().toLowerCase();
  const completedDateString = row.completed_date ? new Date(row.completed_date).toLocaleDateString().toLowerCase() : "";

  const matchesSearch =
    !searchTerm ||
    dateEnteredString.includes(term) ||
    row.name.toLowerCase().includes(term) ||
    row.email_address.toLowerCase().includes(term) ||
    row.request_type.toLowerCase().includes(term) ||
    dateNeededString.includes(term) ||
    (row.applications_involved && row.applications_involved.toLowerCase().includes(term)) ||
    (row.model_after && row.model_after.toLowerCase().includes(term)) ||
    (row.mac_or_pc && row.mac_or_pc.toLowerCase().includes(term)) ||
    (row.requested_by && row.requested_by.toLowerCase().includes(term)) ||
    row.status.toLowerCase().includes(term) ||
    completedDateString.includes(term) ||
    (row.completed_by && row.completed_by.toLowerCase().includes(term)) ||
    (row.ticket_number && row.ticket_number.toString().toLowerCase().includes(term)) || // Assuming ticket_number is a number
    (row.notes && row.notes.toLowerCase().includes(term));

  const matchesStatus = (filters.completed && row.status === "Complete") || (filters.inProgress && row.status === "In Progress") || (filters.newRequests && row.status === "New");

  return matchesSearch && matchesStatus;
});

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Date Entered</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Request Type</th>
            <th>Date Needed</th>
            <th>Applications</th>
            <th>Model After</th>
            <th>Mac or PC</th>
            <th>Requested by</th>
            <th>Status</th>
            <th>Completed Date</th>
            <th>Completed by</th>
            <th>Ticket Number</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredRowData.map((row, index) => (
            <tr key={index} onClick={() => onRowClick(row)}>
              <td>{new Date(row.date_entered).toLocaleString()}</td>
              <td>{row.name}</td>
              <td>{row.email_address}</td>
              <td>{row.request_type}</td>
              <td>{new Date(row.request_needed_date).toLocaleDateString()}</td>
              <td>{row.applications_involved}</td>
              <td>{row.model_after}</td>
              <td>{row.mac_or_pc}</td>
              <td>{row.requested_by}</td>
              <td>{row.status}</td>
              <td>{row.completed_date ? new Date(row.completed_date).toLocaleDateString() : ""}</td>
              <td>{row.completed_by}</td>
              <td>{row.ticket_number}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
