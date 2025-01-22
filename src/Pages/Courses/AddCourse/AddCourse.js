import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import { PhotoCamera } from "@mui/icons-material"; // Icon for file upload
import axios from "axios";

const AddCourse = ({ open, onClose, onAddBanner }) => {
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImageFile, setCourseImageFile] = useState(null);
  const [courseImagePreview, setCourseImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, setImageFile, setImagePreview) => {
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

    if (!courseTitle.trim()) {
      toast.error("Please fill in the course title.");
      return;
    }

    if (!courseUrl.trim()) {
      toast.error("Please fill in the course URL.");
      return;
    }

    if (!coverPhotoFile) {
      toast.error("Please upload a cover photo.");
      return;
    }

    if (!courseDescription.trim()) {
      toast.error("Please fill in the course description.");
      return;
    }

    if (!courseImageFile) {
      toast.error("Please upload a course image.");
      return;
    }

    const formData = new FormData();
    formData.append("cover_photo", coverPhotoFile);
    formData.append("course_title", courseTitle);
    formData.append("course_url", courseUrl);
    formData.append("course_description", courseDescription);
    formData.append("course_image", courseImageFile);

    setLoading(true);

    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/addBanner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.response === true) {
        onAddBanner();
        setCourseTitle("");
        setCourseUrl("");
        setCourseDescription("");
        setCoverPhotoFile(null);
        setCoverPhotoPreview(null);
        setCourseImageFile(null);
        setCourseImagePreview(null);
        onClose();
        toast.success("Course added successfully!");
      } else {
        toast.error(response.data.error_msg || "Failed to add course");
      }
    } catch (error) {
      toast.error("Error adding course: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {loading && <Loader />}

      <DialogTitle>Add New Course</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="cover-photo-upload"
              type="file"
              onChange={(e) => handleImageChange(e, setCoverPhotoFile, setCoverPhotoPreview)}
              required
            />
            <label htmlFor="cover-photo-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
              <span>Upload Cover Photo</span> <span className="text-danger">*</span>
            </label>
          </Box>

          {coverPhotoPreview && (
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
                src={coverPhotoPreview}
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
            label="Course Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />

          <TextField
            label="Course URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={courseUrl}
            onChange={(e) => setCourseUrl(e.target.value)}
            required
          />

          <TextField
            label="Course Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />

          <Box mb={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="course-image-upload"
              type="file"
              onChange={(e) => handleImageChange(e, setCourseImageFile, setCourseImagePreview)}
              required
            />
            <label htmlFor="course-image-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
              <span>Upload Course Image</span> <span className="text-danger">*</span>
            </label>
          </Box>

          {courseImagePreview && (
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
                src={courseImagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Course
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCourse;
