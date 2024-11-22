import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { Description } from "@mui/icons-material";

function GuestActionModal({ guest, onClose ,handleGetAllData}) {
  const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

  const [loading, setLoading] = useState(false);
  const [transactionNumber, setTransactionNumber] = useState(guest.transaction_id || "");
  const [status, setStatus] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    if (!transactionNumber || !status) {
      toast.warn("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/updateWithdrawalRequest`,
        {
            id: guest?.id,
            transaction_id: transactionNumber,
            status: status,
            description: status,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response?.data?.response === true) {

        toast.success("Data submitted successfully");
        handleGetAllData();
        onClose(); 

      } else {
        const errorMsg = response?.data?.message || "Submission failed";
        toast.info(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Submission failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal show onHide={onClose} centered>
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <Modal.Title style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#4a4a4a" }}>Guest Details</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: "2rem",
            maxHeight: "60vh", // Set fixed height for modal body
            overflowY: "auto", // Enable scrolling
          }}
        >
          <div style={{ marginBottom: "1rem", lineHeight: "1.8" }}>
            <p><strong>Restaurant Name:</strong> {guest.restaurantName}</p>
            <p><strong>Owner Name:</strong> {guest.username}</p>
            <p><strong>Request Date:</strong> {new Date(guest.created_at).toLocaleDateString("en-GB")}</p>
            <p><strong>Request Status:</strong> {guest.status}</p>
            <p><strong>Requested Amount:</strong> ₹{parseFloat(guest.withdrawal_amount).toFixed(2)}</p>
            <p><strong>Bank Name:</strong> {guest.bank_name}</p>
            <p><strong>Account Number:</strong> {guest.account_no}</p>
            <p><strong>IFSC Code:</strong> {guest.ifsc_code}</p>

          </div>
          <Form>
            <Form.Group controlId="transactionNumber" style={{ marginBottom: "1rem" }}>
              <Form.Label style={{ fontWeight: "600", color: "#333" }}>Deposited Amount Transaction Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Transaction Number"
                value={transactionNumber}
                onChange={(e) => setTransactionNumber(e.target.value)}
                style={{
                  borderRadius: "8px",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  borderColor: "#ced4da",
                  boxShadow: "none",
                  transition: "all 0.3s",
                }}
              />
            </Form.Group>
            <Form.Group controlId="status" style={{ marginBottom: "1rem" }}>
              <Form.Label style={{ fontWeight: "600", color: "#333" }}>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  borderRadius: "8px",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  borderColor: "#ced4da",
                  cursor: "pointer",
                }}
              >
                <option value="">Select Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button
            variant="secondary"
            onClick={onClose}
            style={{
              backgroundColor: "#6c757d",
              borderColor: "#6c757d",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GuestActionModal;
