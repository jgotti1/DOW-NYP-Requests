import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const LoginPage = ({ onLogin }) => {
  // Accept onLogin prop
  // State to store username, password, and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(`${process.env.REACT_APP_SERVER_URL}login`);
    try {
      // Send username and password to backend for verification
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, userPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, call onLogin to update authentication status
        onLogin();
        console.log("Login successful");
      } else {
        // Login failed, show error message from backend
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-box p-4 border rounded" style={{ backgroundColor: "white" }}>
        <div className="text-center mb-4">
          <p className="mb-0">PAS support team</p> {/* Moved up top and centered */}
          <h2 className="mb-0">New York Post Requests</h2>
        </div>
        <hr />
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100 mt-3">
            {" "}
            {/* Set variant to "danger" for red color */}
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
