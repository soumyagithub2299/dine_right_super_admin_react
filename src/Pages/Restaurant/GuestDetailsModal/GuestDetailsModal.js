// GuestDetailsModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./GuestDetailsModal.css"; // Ensure this file includes the CSS for width
import GuestTableRestro from "../GuestTableRestro/GuestTableRestro";

// Define constants for Card and Cash Revenue
const COMMISION_REVENUE=50;
const CARD_REVENUE = 20; // Percentage for Card Revenue
const CASH_REVENUE = 20; // Percentage for Cash Revenue

const GuestDetailsModal = ({ show, handleClose, restaurant }) => {
  return (
    <Modal show={show} onHide={handleClose} centered className="GuestTableModal">
      <Modal.Header className="GuestDetailsModar-header">
        <Modal.Title>Guest Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="RestaurantDetails-GuestDetailsModal">
          <div className="col-12 col-md-6">
            <h6>Name: {restaurant.name}</h6>
            <p>Email: {restaurant.email}</p>
            <p>Phone: {restaurant.phone}</p>
            <p>Signup Date: {restaurant.date}</p>
            <p>
              Status: {restaurant.status === "confirmed" ? "Approved" : "Unapproved"}
            </p>
          </div>
          <div className="col-12 col-md-6">
            <h6>Monthly Revenu</h6>
            <p>Commision Revenu : {COMMISION_REVENUE}%</p>
            <p>Card Revenu : {CARD_REVENUE}%</p>
            <p>Cash Revenu : {CASH_REVENUE}%</p>
          </div>
        </div>
        <GuestTableRestro />
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
