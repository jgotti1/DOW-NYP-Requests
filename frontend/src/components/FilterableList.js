import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

const requestsData = [
  { id: 1, status: "completed", text: "Completed Request 1" },
  { id: 2, status: "completed", text: "Completed Request 2" },
  { id: 3, status: "in-progress", text: "In Progress Request 1" },
  { id: 4, status: "in-progress", text: "In Progress Request 2" },
  { id: 5, status: "new", text: "New Request 1" },
  { id: 6, status: "new", text: "New Request 2" },
];

const FilterableList = () => {
  const [filters, setFilters] = useState({
    completed: true,
    inProgress: true,
    newRequests: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const filteredRequests = requestsData.filter((request) => {
    const matchesSearch = request.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters[request.status];
    return matchesSearch && matchesStatus;
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  return (
    <Container className="font-size filter-list">
      <Row className="justify-content-start align-items-center">
        {/* Search box in a smaller column */}
        <Col xs="auto" className="pe-3">
          {" "}
          {/* pe-2 adds a small padding to the right */}
          <Form.Group controlId="search" className="mb-0">
            {" "}
            {/* mb-0 removes bottom margin */}
            <Form.Control className="small-input" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>
        </Col>

        {/* Inline checkboxes in the next column */}
        <Col xs="auto" className="ps-0">
          {" "}
          {/* ps-0 removes padding on the left */}
          <Form.Group controlId="filters" className="mb-0">
            {" "}
            {/* mb-0 removes bottom margin */}
            <Form.Check inline type="checkbox" label="Completed" checked={filters.completed} onChange={handleCheckboxChange} name="completed" />
            <Form.Check inline type="checkbox" label="In Progress" checked={filters.inProgress} onChange={handleCheckboxChange} name="inProgress" />
            <Form.Check inline type="checkbox" label="New" checked={filters.newRequests} onChange={handleCheckboxChange} name="newRequests" />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterableList;

