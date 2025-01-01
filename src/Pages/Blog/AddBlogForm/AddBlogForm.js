import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import { PhotoCamera } from "@mui/icons-material"; // Icon for file upload
import "./AddBlogForm.css"; // Import custom CSS for styles
import axios from "axios";

const AddBlogForm = ({
  open,
  onClose,
  onAddBlog,
  selectedBlog,
  getAllBlogData,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (selectedBlog) {
  //     setTitle(selectedBlog.blog_title || "");
  //     setDescription(selectedBlog.blog_description || "");
  //     setImagePreview(selectedBlog.blog_image || null);
  //   } else {
  //     setTitle("");
  //     setDescription("");
  //     setImagePreview(null);
  //   }
  // }, [selectedBlog]);

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

  const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    if (!title.trim()) {
      toast.error("Please fill in the blog title.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please fill in the blog description.");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload a blog image.");
      return;
    }

    const formData = new FormData();
    formData.append("blog_image", imageFile);
    formData.append("blog_title", title);
    formData.append("blog_description", description);

    // Include the blog ID if editing an existing blog
    if (selectedBlog) {
      formData.append("blog_id", selectedBlog.blog_id);
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      // Use axios to send the POST request with FormData
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/insertOrUpdateBlog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for form data
          },
        }
      );

      // Check if the response indicates success
      if (response?.data?.response === true) {

        getAllBlogData();

        setTitle("");
        setDescription("");
        setImageFile(null);
        setImagePreview(null);

        onClose();

        toast.success(
          selectedBlog
            ? "Blog updated successfully!"
            : "Blog added successfully!"
        );
      } else {
        toast.error(response.data.error_msg || "Failed to add/edit blog");
      }
    } catch (error) {
      toast.error("Error adding/editing blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      if (selectedBlog) {
        setLoading(true);

        const body = {
          blog_id: selectedBlog?.blog_id,
        };


        try {
          const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

          const response = await axios.get(
            `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/getBlog/${selectedBlog?.blog_id}`,
            // body,
            {
              headers: {
                Authorization: `Bearer ${token}`,      
              },
            }
          );

          if (response?.data?.response === true) {
            const data = response?.data?.blog;

            setTitle(data.blog_title || "");
            setDescription(data.blog_description || "");

            setImageFile(data.blog_image_url || "");

            setImagePreview(data.blog_image_url || "");


          } else {
            console.log(response.data.error_msg || "Failed to fetch blog data");
          }
        } catch (error) {
          console.log("Error fetching blog data: " + error.message);
        } finally {
          setLoading(false); // Ensure loading state is reset
        }
      }
    };

    fetchBlogData();
  }, [selectedBlog]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        {loading && <Loader />}

        <DialogTitle>
          {selectedBlog ? "Edit Blog" : "Create New Blog"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                required={!selectedBlog} // Make it required only if editing
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
              label="Blog Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <TextField
              label="Blog Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedBlog ? "Edit Blog" : "Add Blog"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBlogForm;
