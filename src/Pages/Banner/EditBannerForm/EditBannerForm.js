import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import { PhotoCamera } from "@mui/icons-material"; // Icon for file upload
import axios from "axios";

const EditBannerForm = ({ open, onClose, selectedBanner, onEditBanner }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBanner) {
      setTitle(selectedBanner.banner_title || "");
      setUrl(selectedBanner.banner_url || "");
      setImagePreview(selectedBanner.banner_image_url || "");
    }
  }, [selectedBanner]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!title.trim()) {
      toast.error("Please fill in the banner title.");
      return;
    }

    if (!url.trim()) {
      toast.error("Please fill in the banner URL.");
      return;
    }

    const formData = new FormData();
    formData.append("banner_image", imageFile || selectedBanner.banner_image);
    formData.append("banner_title", title);
    formData.append("banner_url", url);
    formData.append("banner_id", selectedBanner.id);

    setLoading(true);

    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/editBanner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for form data
          },
        }
      );

      if (response?.data?.response === true) {
        onEditBanner(); // Call the parent component function to refresh the banner list
        onClose(); // Close the modal
        toast.success("Banner updated successfully!");
      } else {
        toast.error(response.data.error_msg || "Failed to edit banner");
      }
    } catch (error) {
      toast.error("Error editing banner: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {loading && <Loader />}

      <DialogTitle>Edit Banner</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
              <span>Upload Image</span>
            </label>
          </Box>

          {imagePreview && (
            <Box
              className="image-preview"
              sx={{
                width: "150px",
                height: "150px",
                border: "2px solid #1976d2", // Blue border
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover", // Ensures the image covers the box without stretching
                }}
              />
            </Box>
          )}

          <TextField
            label="Banner Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Banner URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Edit Banner
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBannerForm;
