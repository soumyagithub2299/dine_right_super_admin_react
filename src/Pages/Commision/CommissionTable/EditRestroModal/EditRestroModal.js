import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; // Import axios for API calls
import "./EditRestroModal.css";
import Loader from "../../../Loader/Loader";
import { Box } from "react-bootstrap-icons";

const EditRestroModal = ({
  show,
  handleClose,
  restaurantDetails,
  getRestaurantTableData,
}) => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({
    status: "",
    commission: "",
  });

  const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

  // Array for status dropdown options
  const statusOptions = [
    { key: "Activated", label: "Approved" },
    { key: "Deactivated", label: "Unapproved" },
  ];

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

            // Update fasaiDocs and liquerDoc based on the user object
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

  // Handle status change
  const handleStatusChange = (e) => {
    setRestaurant({ ...restaurant, status: e.target.value });
  };

  // Handle commission change
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

      <ToastContainer />
      <Dialog
        open={show}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            maxHeight: '90vh',
            overflow: 'auto', // Makes the dialog scrollable
          },
        }}
      >
        <DialogTitle>Edit Restaurant</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              {/* Dynamically render Fasai documents */}
              {fasaiDocs.length > 0 ? ( // Check if fasaiDocs is not empty
                fasaiDocs.map(
                  (doc, index) => (
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

            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label" shrink>
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                value={restaurant.status}
                onChange={handleStatusChange}
                fullWidth
                label="Status"
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="% Wise Commission"
              type="text"
              value={restaurant.commission}
              onChange={handleCommissionChange}
              placeholder="Enter commission percentage"
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{
              backgroundColor: "rgb(223, 22, 22)",
              color: "white",
              border: "none",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditRestroModal;
