import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Close icon for modal
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Loader/Loader";


const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

const UserDetailsModal = ({
  show,
  handleClose,
  restaurantDetails,
  getRestaurantTableData,
}) => {
  const [restaurant, setRestaurant] = useState({
    status: "",
    commission: "",
  });
  const [loading, setLoading] = useState(false);

  const [fasaiDocs, setFasaiDocs] = useState([]);
  const [liquerDoc, setLiquerDoc] = useState();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (restaurantDetails) {
        try {
          setLoading(true);

          const response = await axios.get(
            `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/getGuestsbyID/${restaurantDetails?.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Check if the response is successful and user data exists
          if (response?.data?.response === true && response.data.users) {
            const user = response.data.users; // Directly get the user object

            // Set the restaurant state with the appropriate fields
            setRestaurant({
              status: user.status || "Deactivated",
              commission: user.commission || "",
            });

            // Update fassaiDocs and liquerDoc based on the user object
            setFasaiDocs(user.restaurant_fassai_image_name || []);
            setLiquerDoc(user.license_image || "");
          }
        } catch (error) {
          console.error("Error fetching restaurant details", error);
          // Optionally handle the error with a toast notification
          toast.error("Failed to fetch restaurant details. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRestaurantDetails();
  }, [restaurantDetails]);

  const handleCommissionChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setRestaurant({ ...restaurant, commission: value });
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      id: restaurantDetails?.id,
      status: restaurant.status,
      commission: restaurant.commission,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/updateUserStatusAndCommission`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response?.data?.response === true) {
        toast.success(
          response.data.success_msg || "Restaurant updated successfully!"
        );
        handleClose();
        getRestaurantTableData();
      } else {
        toast.error(response.data.error_msg || "Failed. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update restaurant. Please try again.");
      console.error("Failed to update restaurant", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       {loading && <Loader />}
    
    <Modal open={show} onClose={handleClose}>
      <Box
        sx={{
          width: "50%",
          maxHeight: "90vh",
          height: "auto",
          overflowY: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          padding: 2,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <h2>Restaurant Details</h2>

        {loading ? (
          <Loader />
        ) : restaurantDetails ? (
          <form onSubmit={handleFormSubmit}>
            <div>
              <p>Restaurant name: {restaurantDetails.restaurantName}</p>
              <p>Restaurant address: {restaurantDetails.restaurantAddress}</p>
              <p>Owner name: {restaurantDetails.username}</p>
              <p>Email: {restaurantDetails.email}</p>
              <p>Phone: {restaurantDetails.phone}</p>
              <p>
                Signup Date:{" "}
                {new Date(restaurantDetails.created_at)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")}
              </p>

              <p>Total Revenue Generated: NULL
                {/* {restaurantDetails.created_at} */}
                </p>
              <p>Total Commision Generated: NULL
                {/* {restaurantDetails.created_at} */}
                </p>
              <p>Commision Status: NULL
                {/* {restaurantDetails.created_at} */}
                </p>

            </div>



            <Grid container spacing={2}>
              {/* Dynamically render Fasai documents */}
              {fasaiDocs.length > 0 ? ( // Check if fasaiDocs is not empty
                fasaiDocs.map(
                  (
                    doc,
                    index // Use index as a fallback key if no unique id
                  ) => (
                    <Grid item xs={12} key={index}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => window.open(doc, "_blank")} // Use the URL directly
                      >
                        Download Fasai Document {index + 1}{" "}
                        {/* Simple labeling */}
                      </Button>
                    </Grid>
                  )
                )
              ) : (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: "grey.300", // Change to your desired background color
                      padding: "10px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body1" color="textSecondary">
                      No Fasai documents available.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            <Grid container spacing={2} mt={2}>
              {/* Button for downloading Liquor License */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => window.open(liquerDoc, "_blank")} // Use liquerDoc directly
                  disabled={!liquerDoc} // Disable button if no document URL is available
                >
                  Download Liquor License
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              {/* Status and Commission fields in a single row */}
              <Grid item xs={6}>
                <TextField
                  select
                  label="Status"
                  value={restaurant.status}
                  onChange={(e) =>
                    setRestaurant({ ...restaurant, status: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  InputProps={{
                    sx: { height: 45 }, // Adjust height of input fields
                  }}
                >
                  <MenuItem value="Activated">Approved</MenuItem>
                  <MenuItem value="Deactivated">Unapproved</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="% Wise Commission"
                  value={restaurant.commission}
                  onChange={handleCommissionChange}
                  fullWidth
                  margin="normal"
                  placeholder="Enter commission percentage"
                  InputProps={{
                    sx: { height: 45 }, // Adjust height of input fields
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button centered */}
            <Box textAlign="center" mt={2}>
              <Button
                type="submit"
                onClick={handleFormSubmit}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Changes"}
              </Button>
            </Box>
          </form>
        ) : (
          <p>No restaurant details available.</p>
        )}
      </Box>
    </Modal>
    </>
  );
};

export default UserDetailsModal;
