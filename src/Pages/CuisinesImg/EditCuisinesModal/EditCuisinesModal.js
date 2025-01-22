import React, { useState, useEffect } from "react";
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

function EditCuisinesModal({ show, handleClose, bannerToEdit, handleUpdate }) {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (bannerToEdit) {
      setImage(bannerToEdit.image); // Set initial image
      setText(bannerToEdit.text); // Set initial text
      setImagePreview(bannerToEdit.image); // Set initial image preview
    }
  }, [bannerToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview after file upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (!text.trim()) {
      toast.error("Please fill in the cuisine name.");
      return;
    }

    if (!image) {
      toast.error("Please upload a cuisine image.");
      return;
    }

    handleUpdate({ ...bannerToEdit, image, text });
    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Cuisine</DialogTitle>
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCuisinesModal;
