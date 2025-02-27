import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = ({selected, setSelected}) => {
  

  const handleSelect = (eventKey) => {
    setSelected(eventKey);
  };
  console.log(selected);

  return (
        <div>
      {/* Black rule at the top of the screen */}
      <div style={{ backgroundColor: "black", height: "1px", width: "100%", position: "fixed", top: 0, zIndex: 1060 }} />
    <Navbar bg="light" expand="lg" style={{ zIndex: 1050, position: "relative" }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" style={{ marginLeft: "auto" }}>
          <NavDropdown
            title={<span style={{ fontWeight: "bold" }}>Brand Selection</span>}
            id="basic-nav-dropdown"
            onSelect={handleSelect}
            align="end"
            style={{ marginRight: "15px", border: "1px solid grey", borderRadius: "5px" }}>
            <NavDropdown.Header style={{ fontWeight: "bold" }}>Brand Selection</NavDropdown.Header>
            <NavDropdown.Item eventKey="New York Post" active={selected === "New York Post"}>
              {selected === "New York Post" && <>&#10003; </>} New York Post
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="DowJones" active={selected === "DowJones"}>
              {selected === "DowJones" && <>&#10003; </>} DowJones
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      </div>
  );
};

export default NavBar;
