import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCuisinesModal({ show, handleClose, handleSave }) {
  const [bannerText, setBannerText] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!bannerText.trim()) {
      toast.error("Please fill in the cuisine name.");
      return;
    }

    if (!bannerImage) {
      toast.error("Please upload a cuisine image.");
      return;
    }

    handleSave(bannerText, bannerImage);
    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Cuisine</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            required
          />
          <label htmlFor="image-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
            <span>Upload Image</span> <span className="text-danger">*</span>
          </label>
        </Box>

        {imagePreview && (
          <Box
            sx={{
              width: "150px",
              height: "150px",
              border: "2px solid #1976d2",
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
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <TextField
          label="Cuisine Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={bannerText}
          onChange={(e) => setBannerText(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Cuisine
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCuisinesModal;
