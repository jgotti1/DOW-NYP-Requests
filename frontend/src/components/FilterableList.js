import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useFilters } from "../hooks/FilterContext"; // Adjust the import path as necessary

const FilterableList = () => {
  const { filters, setFilters, searchTerm, setSearchTerm } = useFilters(); // Use the custom hook to access and set filters


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
    console.log(filters)
  };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

  return (
    <Container className="filter-list">
      <Row className="justify-content-start align-items-center">
        <Col xs="auto" className="pe-3">
          <Form.Group controlId="search" className="mb-0">
            <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
          </Form.Group>
        </Col>

        <Col xs="auto" className="ps-0">
          <Form.Group controlId="filters" className="mb-0">
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
