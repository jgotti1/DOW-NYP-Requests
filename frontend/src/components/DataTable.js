import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function DataTable() {
  // Example row data (for demonstration purposes)
  const rowData = [
    {
      dateEntered: "2024-03-21",
      name: "John Doe",
      emailAddress: "johndoe@example.com",
      requestType: "New Hire Add Apps",
      dateNeeded: "2024-03-25",
      applications: "MS Office, Slack",
      modelAfter: "Jane Smith",
      macOrPc: "PC",
      requestedBy: "Adam Johnson",
      status: "Complete", // This would be "Complete" for rows you want to highlight
      completedDate: "N/A",
      completedBy: "N/A",
      ticketNumber: "123456",
      notes: "Urgent setup required",
    },
    {
      dateEntered: "2024-03-21",
      name: "John Doe",
      emailAddress: "johndoe@example.com",
      requestType: "New Hire Add Apps",
      dateNeeded: "2024-03-25",
      applications: "MS Office, Slack",
      modelAfter: "Jane Smith",
      macOrPc: "PC",
      requestedBy: "Adam Johnson",
      status: "New", // This would be "Complete" for rows you want to highlight
      completedDate: "N/A",
      completedBy: "N/A",
      ticketNumber: "123456",
      notes: "Urgent setup required",
    },
    // Add more rows here if needed
  ];

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
          {rowData.map((row, index) => (
            <tr key={index}>
              <td>{row.dateEntered}</td>
              <td>{row.name}</td>
              <td>{row.emailAddress}</td>
              <td>{row.requestType}</td>
              <td>{row.dateNeeded}</td>
              <td>{row.applications}</td>
              <td>{row.modelAfter}</td>
              <td>{row.macOrPc}</td>
              <td>{row.requestedBy}</td>
              <td>{row.status}</td>
              <td>{row.completedDate}</td>
              <td>{row.completedBy}</td>
              <td>{row.ticketNumber}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
