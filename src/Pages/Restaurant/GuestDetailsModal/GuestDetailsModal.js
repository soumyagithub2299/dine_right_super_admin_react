// GuestDetailsModal.js
import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "./GuestDetailsModal.css"; // Ensure this file includes the CSS for width
import GuestTableRestro from "../GuestTableRestro/GuestTableRestro";

const COMMISION_REVENUE = 50;
const CARD_REVENUE = 20; 
const CASH_REVENUE = 20; 

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 21 }, (_, i) => 2000 + i);

const GuestDetailsModal = ({ show, handleClose, restaurant }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="GuestTableModal">
      <Modal.Header className="GuestDetailsModar-header">
        <Modal.Title>Restaurant Details</Modal.Title>
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
            {/* <div className="dropdown-GuestModal">
              <Dropdown onSelect={handleMonthSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-month">
                  {selectedMonth || "Select Month"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {months.map((month, index) => (
                    <Dropdown.Item key={index} eventKey={month}>
                      {month}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="mt-2" onSelect={handleYearSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-year">
                  {selectedYear || "Select Year"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {years.map((year, index) => (
                    <Dropdown.Item key={index} eventKey={year}>
                      {year}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
            <h6 className="mt-3">Monthly Revenue</h6>
            <p>Commission Revenue: {COMMISION_REVENUE}%</p>
            <p>Card Revenue: {CARD_REVENUE}$</p> 
            <p>Cash Revenue: {CASH_REVENUE}$</p> 
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
