import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const OrdersModal = ({ show, handleClose, selectedRestaurant }) => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const getRestaurantBookings = async () => {
    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/getCustomerBookings/${selectedRestaurant?.customer_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      if (response.data) {
        setOrderData(response.data);
      } else {
        toast.error("Failed to fetch bookings. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show && selectedRestaurant) {
      getRestaurantBookings();
    }
  }, [show, selectedRestaurant]);

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6" className="order-title">
          Orders for {selectedRestaurant?.restaurantName || "Restaurant"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5" gutterBottom>
            Order Details:
          </Typography>
          <Typography variant="h5" style={{ alignSelf: "flex-start" }}>
            Total Orders: {orderData.length}
          </Typography>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Sr. No.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Restaurant Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Restaurant Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Booking Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Booking Date
                  </TableCell>{" "}
                 
                  {/* <TableCell sx={{ fontWeight: "bold" }}>
                    Booking Time
                  </TableCell>{" "} */}
                 
                  <TableCell sx={{ fontWeight: "bold" }}>
                    No. of Guests
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Payment Mode
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Payment Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Booking Status
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orderData.length > 0 ? (
                  orderData.map((booking, index) => (
                    <TableRow key={booking.booking_id}>
                      <TableCell>{index + 1}</TableCell> {/* Sr. No. */}
                      <TableCell>
                        {booking.restaurant?.restaurantName}
                      </TableCell>
                      <TableCell>{booking.restaurant?.email}</TableCell>
                      <TableCell>{booking.booking_name}</TableCell>
                      <TableCell>
                        {new Date(booking.booking_date).toLocaleDateString()}{" "}
                        {/* Format Booking Date */}
                      </TableCell>
                      {/* <TableCell>
                        {new Date(booking.booking_time).toLocaleTimeString()}{" "}
                      </TableCell> */}
                      <TableCell>{booking.booking_no_of_guest}</TableCell>
                      <TableCell>${booking.billing_amount}</TableCell>
                     <TableCell>{booking.payment_mod.charAt(0).toUpperCase() + booking.payment_mod.slice(1)}</TableCell>
                      <TableCell>{booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}</TableCell>
                      <TableCell>{booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      {" "}
                      {/* Adjust colspan to 11 */}
                      No bookings available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrdersModal;
