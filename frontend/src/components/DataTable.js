import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DataTable() {
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
          <tr>
            <td>2024-03-21</td>
            <td>John Doe</td>
            <td>johndoe@example.com</td>
            <td>New Hire Add Apps</td>
            <td>2024-03-25</td>
            <td>MS Office, Slack</td>
            <td>Jane Smith</td>
            <td>PC</td>
            <td>Adam Johnson</td>
            <td>New</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>123456</td>
            <td>Urgent setup required</td>
          </tr>
          {/* Add more rows here if needed */}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
