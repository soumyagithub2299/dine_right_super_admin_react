import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./EditRestroModal.css";

const EditRestroModal = ({
  show,
  handleClose,
  restaurant,
  setRestaurant,
  handleSubmit,
}) => {
  // Function to handle commission input
  const handleCommissionChange = (e) => {
    const value = e.target.value;

    // Allow only valid numeric input (including decimals)
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setRestaurant({ ...restaurant, commission: value });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Modal Header */}
      <Modal.Header>
        <Modal.Title>Edit Restaurant</Modal.Title>
      </Modal.Header>
      
      {/* Modal Body */}
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="restaurantStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={restaurant.status}
              onChange={(e) => setRestaurant({ ...restaurant, status: e.target.value })}
            >
              <option value="confirmed">Approved</option>
              <option value="cancelled">Unapproved</option>
            </Form.Control>
          </Form.Group>
          
          {/* New Input for % Wise Commission */}
          <Form.Group controlId="restaurantCommission" className="mt-2">
            <Form.Label>% Wise Commission</Form.Label>
            <Form.Control
              type="text" // Changed to text to allow decimals
              value={restaurant.commission}
              onChange={handleCommissionChange} // Use the new handler
              placeholder="Enter commission percentage"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Modal Footer for buttons */}
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit} className="btn-saveChanges-guest">
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleClose} className="btn-cancel-guest">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRestroModal;
