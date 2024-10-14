import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import { PhotoCamera } from '@mui/icons-material'; // Icon for file upload

const AddBlogForm = ({ open, onClose, onAddBlog }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

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
    const formData = new FormData();
    formData.append('blog_image', imageFile);
    formData.append('blog_title', title);
    formData.append('blog_description', description);

    setLoading(true);

    try {
      const token = localStorage.getItem('superAdminTokenDineRight');
      const response = await fetch('https://dineright.techfluxsolutions.com/api/auth/insertOrUpdateBlog', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        toast.error('Failed to add blog');
        return;
      }

      const data = await response.json();
      onAddBlog(data);
      toast.success('Blog added successfully!');
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      onClose(); // Close modal after successful submission
    } catch (error) {
      toast.error('Error adding blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Blog</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="image-upload">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
                <span>Upload Image</span>
              </label>
            </Box>

            {imagePreview && (
              <Box className="text-center my-3">
                <img src={imagePreview} alt="Preview" style={{ width: '150px', borderRadius: '8px' }} />
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
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Blog
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer /> {/* Toast Notifications */}
    </>
  );
};

export default AddBlogForm;

