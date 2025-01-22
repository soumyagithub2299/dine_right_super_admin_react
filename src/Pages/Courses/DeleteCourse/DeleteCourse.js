
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteCourse = ({ open, onClose, bannerToDelete, onDeleteBanner }) => {
  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    onDeleteBanner(bannerToDelete);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <span style={{ fontWeight: "bold", color: "red" }}>
            {bannerToDelete?.title}
          </span>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleDelete} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCourse;
