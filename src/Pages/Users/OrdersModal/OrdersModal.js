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
import axios from "axios"; // Assuming axios is used for the API call
import { toast } from "react-toastify";

const OrdersModal = ({ show, handleClose, selectedRestaurant }) => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    visitedRestaurants: [], // Holds the list of restaurants
    comment: "",
  });

  const getRestaurantTableData = async () => {
    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      if (response?.data?.response === true) {
        const data = response?.data?.customers || [];
        setOrderData({
          visitedRestaurants: data,
          comment: data.comment || "No comments available.",
        });
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      toast.error("Failed to load restaurant data. Please try again.");
      setLoading(false);
    }
  };

  // Fake data to test rendering without API call
  const fakeData = [
    {
      name: "Restaurant A",
      items: ["Pizza", "Burger"],
      totalPrice: 49.99,
      comment: "Amazing food!",
    },
    {
      name: "Restaurant B",
      items: ["Pasta", "Salad"],
      totalPrice: 39.5,
      comment: "Good service!",
    },
    {
      name: "Restaurant C",
      items: ["Sushi", "Ramen"],
      totalPrice: null, // No price provided to test fallback
      comment: "Great ambiance!",
    },
  ];

  // Fetch data when modal is shown
  useEffect(() => {
    if (show) {
      getRestaurantTableData();
    }
  }, [show]);

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6" className="order-title">
          Orders from {selectedRestaurant ? selectedRestaurant.name : "Restaurant"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className="container">
          <Typography variant="h5" gutterBottom>
            Order Details:
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Visited Restaurant</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ordered Items</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Total Price</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Comment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Replace 'fakeData' with 'orderData.visitedRestaurants' for real data */}
                  {fakeData.length > 0 ? (
                    fakeData.map((restaurant, index) => (
                      <TableRow key={index}>
                        <TableCell>{restaurant.name}</TableCell>
                        <TableCell>
                          <ul>
                            {restaurant.items && restaurant.items.length > 0 ? (
                              restaurant.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                              ))
                            ) : (
                              <Typography>No items available.</Typography>
                            )}
                          </ul>
                        </TableCell>
                        {/* Add a fallback if totalPrice is undefined */}
                        <TableCell>
                          {restaurant.totalPrice !== undefined && restaurant.totalPrice !== null
                            ? `$${restaurant.totalPrice.toFixed(2)}`
                            : "Price not available"}
                        </TableCell>
                        <TableCell>{restaurant.comment || "No comment available."}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No visited restaurants available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
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
