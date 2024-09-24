// GuestDetailsModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./GuestDetailsModal.css"; // Ensure this file includes the CSS for width
import GuestTableRestro from "../GuestTableRestro/GuestTableRestro";

const GuestDetailsModal = ({ show, handleClose, restaurant }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className="GuestTableModal">
      <Modal.Header>
        <Modal.Title>Guest Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Name: {restaurant.name}</h5>
        <p>Email: {restaurant.email}</p>
        <p>Phone: {restaurant.phone}</p>
        <p>Signup Date: {restaurant.date}</p>
        <p>Status: {restaurant.status === "confirmed" ? "Approved" : "Unapproved"}</p>
        <GuestTableRestro/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuestDetailsModal;
