import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useFiltersDow } from "../hooks/FilterContextDow"; // Adjust the import path as necessary

const FilterableListDow = () => {
  const { filtersDow, setFiltersDow, searchTermDow, setSearchTermDow } = useFiltersDow(); // Use the custom hook to access and set filters


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFiltersDow((prevFilters) => ({ ...prevFilters, [name]: checked }));
    console.log(filtersDow)
  };

    const handleSearchChange = (e) => {
      setSearchTermDow(e.target.value);
    };

  return (
    <Container className="filter-list">
      <Row className="justify-content-start align-items-center">
        <Col xs="auto" className="pe-3">
          <Form.Group controlId="search" className="mb-0">
            <Form.Control type="text" placeholder="Search..." value={searchTermDow} onChange={handleSearchChange} />
          </Form.Group>
        </Col>

        <Col xs="auto" className="ps-0">
          <Form.Group controlId="filters" className="mb-0">
            <Form.Check inline type="checkbox" label="Completed" checked={filtersDow.completed} onChange={handleCheckboxChange} name="completed" />
            <Form.Check inline type="checkbox" label="In Progress" checked={filtersDow.inProgress} onChange={handleCheckboxChange} name="inProgress" />
            <Form.Check inline type="checkbox" label="New" checked={filtersDow.newRequests} onChange={handleCheckboxChange} name="newRequests" />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterableListDow;
