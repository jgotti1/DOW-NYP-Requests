import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function DataEntryModal({ show, handleClose, handleSubmit, handleDelete, initialData = {}, admin }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email_address: initialData.email_address || "",
    request_type: initialData.request_type || "New Hire",
    request_needed_date: initialData.request_needed_date || "",
    applications_involved: initialData.applications_involved || "",
    model_after: initialData.model_after || "",
    mac_or_pc: initialData.mac_or_pc || "",
    requested_by: initialData.requested_by || "",
    status: initialData.status || "New",
    completed_by: initialData.completed_by || "",
    ticket_number: initialData.ticket_number || "",
    notes: initialData.notes || "",
  });

  useEffect(() => {
    if (initialData.request_needed_date) {
      // Convert ISO 8601 format to YYYY-MM-DD format
      const date = new Date(initialData.request_needed_date);
      const formattedDate = date.toISOString().split("T")[0]; // This will give you YYYY-MM-DD format
      initialData.request_needed_date = formattedDate;
    }
    setFormData({
      name: initialData.name || "",
      email_address: initialData.email_address || "",
      request_type: initialData.request_type || "New Hire",
      request_needed_date: initialData.request_needed_date || "",
      applications_involved: initialData.applications_involved || "",
      model_after: initialData.model_after || "",
      mac_or_pc: initialData.mac_or_pc || "",
      requested_by: initialData.requested_by || "",
      status: initialData.status || "New",
      completed_by: initialData.completed_by || "",
      ticket_number: initialData.ticket_number || "",
      notes: initialData.notes || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} className="data-entry-modal">
      <Modal.Header closeButton>
        <Modal.Title>{initialData.id ? "Edit Request" : "New Request"}</Modal.Title>
        <br />
      </Modal.Header>
      <small className="required">* Required fields</small>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control type="email" name="email_address" value={formData.email_address} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Request Type</Form.Label>
                <Form.Select name="request_type" value={formData.request_type} onChange={handleChange}>
                  <option value="Add Access">Add Access</option>
                  <option value="Change Access">Change Access</option>
                  <option value="New Hire">New Hire</option>
                  <option value="Remove Access">Remove Access</option>
                  <option value="Termination">Termination</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model After</Form.Label>
                <Form.Control type="text" name="model_after" value={formData.model_after} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Device *</Form.Label>
                <Form.Select name="mac_or_pc" value={formData.mac_or_pc} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="N/A">N/A</option>
                  <option value="Mac">Mac</option>
                  <option value="PC">PC</option>
                  <option value="Own Device">Own Device</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Requested By</Form.Label>
                <Form.Control type="text" name="requested_by" value={formData.requested_by} onChange={handleChange} />
              </Form.Group>

              {admin && (
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={handleChange}>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                  </Form.Select>
                </Form.Group>
              )}

              {admin && (
                <Form.Group className="mb-3">
                  <Form.Label>Completed By</Form.Label>
                  <Form.Select name="completed_by" value={formData.completed_by} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Benjamin Larry">Benjamin Larry</option>
                    <option value="Jinan Haung">Jinan Haung</option>
                    <option value="John Margotti">John Margotti</option>
                    <option value="John OConnor">John OConnor</option>
                    <option value="Keith Whaley">Keith Whaley</option>
                    <option value="Kenny Shiu">Kenny Shiu</option>
                    <option value="Kyle Spelman">Kyle Spelman</option>
                    <option value="Li Xie">Li Xie</option>
                    <option value="Tim Ruffner">Tim Ruffner</option>
                    <option value="Uvash Seeraj">Uvash Seeraj</option>
                  </Form.Select>
                </Form.Group>
              )}
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Applications Involved *</Form.Label>
                <Form.Control type="text" name="applications_involved" value={formData.applications_involved} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Request Needed Date *</Form.Label>
                <Form.Control type="date" name="request_needed_date" value={formData.request_needed_date} onChange={handleChange} />
              </Form.Group>
            </Col>
            {admin && (
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ticket Number</Form.Label>
                  <Form.Control type="text" name="ticket_number" value={formData.ticket_number} onChange={handleChange} />
                </Form.Group>
              </Col>
            )}
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="notes" value={formData.notes} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        {/* Left side buttons */}
        <div>
          {initialData.id && (
            <>
              <Button variant="outline-primary" onClick={() => console.log("Copy Button")} className="me-2">
                Copy
              </Button>
              <Button variant="danger" onClick={() => handleDelete(initialData.id)}>
                Delete
              </Button>
            </>
          )}
        </div>

        {/* Right side buttons */}
        <div>
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Close
          </Button>
          {initialData.id ? (
            <Button variant="warning" onClick={() => handleSubmit(formData)}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={() => handleSubmit(formData)}>
              Save Changes
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DataEntryModal;
