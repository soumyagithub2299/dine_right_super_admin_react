import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./EditCommissionModal.css";

const EditCommissionModal = ({
  show,
  handleClose,
  restaurant,
  setRestaurant,
  handleSubmit,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Edit Restaurant</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="restaurantStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={restaurant.status}
              onChange={(e) =>
                setRestaurant({ ...restaurant, status: e.target.value })
              }
            >
              <option value="approved">Paid</option>
              <option value="unapproved">Unpaid</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit} // Ensuring form submission
          className="btn-saveChanges-guest"
        >
          Save Changes
        </Button>
        <Button
          variant="secondary"
          onClick={handleClose}
          className="btn-cancel-guest"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCommissionModal;
