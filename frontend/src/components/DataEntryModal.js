import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './CustomeStyles.css'

function DataEntryModal({ show, handleClose, handleSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email_address: initialData.email_address || "",
    request_type: initialData.request_type || "New Hire",
    request_needed_date: initialData.request_needed_date || "",
    applications_involved: initialData.applications_involved || "",
    model_after: initialData.model_after || "",
    mac_or_pc: initialData.mac_or_pc || "Mac",
    requested_by: initialData.requested_by || "",
    status: initialData.status || "New",
    completed_by: initialData.completed_by || "",
    ticket_number: initialData.ticket_number || "",
    notes: initialData.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} className="data-entry-modal">
      <Modal.Header closeButton>
        <Modal.Title>{initialData.id ? "Edit Request" : "New Request"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" name="email_address" value={formData.email_address} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Request Type</Form.Label>
                <Form.Select name="request_type" value={formData.request_type} onChange={handleChange}>
                  <option value="New Hire">New Hire</option>
                  <option value="Add Apps">Add Apps</option>
                  <option value="Termination">Termination</option>
                  <option value="Remove Access">Remove Access</option>
                  <option value="Add/Change Request">Add/Change Request</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model After</Form.Label>
                <Form.Control type="text" name="model_after" value={formData.model_after} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Mac or PC</Form.Label>
                <Form.Select name="mac_or_pc" value={formData.mac_or_pc} onChange={handleChange}>
                  <option value="Mac">Mac</option>
                  <option value="PC">PC</option>
                  <option value="Own Device">Own Device</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Requested By</Form.Label>
                <Form.Control type="text" name="requested_by" value={formData.requested_by} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Completed By</Form.Label>
                <Form.Select name="completed_by" value={formData.completed_by} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="JM">JM</option>
                  <option value="KS">KS</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Applications Involved</Form.Label>
                <Form.Control type="text" name="applications_involved" value={formData.applications_involved} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Request Needed Date</Form.Label>
                <Form.Control type="date" name="request_needed_date" value={formData.request_needed_date} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Ticket Number</Form.Label>
                <Form.Control type="text" name="ticket_number" value={formData.ticket_number} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="notes" value={formData.notes} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit(formData)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DataEntryModal;

