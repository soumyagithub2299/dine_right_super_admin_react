import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Typography,
} from "@mui/material";
import Loader from "../../Loader/Loader";
import AddCuisinesModal from "../AddCusinesModal/AddCuisinesModal";
import EditCuisinesModal from "../EditCuisinesModal/EditCuisinesModal";
import DeleteCusinesModal from "../DeleteCusinesModal/DeleteCusinesModal";

const CuisinesTable = () => {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [cuisineToDelete, setCuisineToDelete] = useState(null);

  const dummyData = [
    {
      id: 1,
      text: "Pizza",
      image: "https://via.placeholder.com/100x50?text=Pizza",
    },
    {
      id: 2,
      text: "Burger",
      image: "https://via.placeholder.com/100x50?text=Burger",
    },
  ];

  // Simulate fetching data with loading state
  const getAllCuisineData = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setCuisines(dummyData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching cuisine data: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCuisineData();
  }, []);

  const handleAddCuisine = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleAddCuisineSuccess = () => {
    getAllCuisineData();
  };

  const handleEditCuisine = (cuisine) => {
    setSelectedCuisine(cuisine);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedCuisine(null);
  };

  const handleEditCuisineSuccess = (updatedCuisine) => {
    const updatedCuisines = cuisines.map((cuisine) =>
      cuisine.id === updatedCuisine.id ? updatedCuisine : cuisine
    );
    setCuisines(updatedCuisines);
  };

  const handleDeleteCuisine = (cuisine) => {
    setCuisineToDelete(cuisine);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setCuisineToDelete(null);
  };

  const handleConfirmDeleteCuisine = (cuisine) => {
    const updatedCuisines = cuisines.filter((c) => c.id !== cuisine.id);
    setCuisines(updatedCuisines);
  };

  return (
    <>
      <Button
        variant="contained"
        style={{
          float: "right",
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
          fontWeight: "500",
          transition: "background-color 0.3s ease",
          marginBottom: "10px",
        }}
        onClick={handleAddCuisine}
      >
        Add Cuisine
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SR No.</TableCell>
              <TableCell>Cuisine Name</TableCell>
              <TableCell>Cuisine Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuisines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="h6">No data available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              cuisines.map((cuisine, index) => (
                <TableRow key={cuisine.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cuisine.text}</TableCell>
                  <TableCell>
                    <img
                      src={cuisine.image}
                      alt={cuisine.text}
                      style={{ width: "100px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditCuisine(cuisine)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteCuisine(cuisine)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCuisinesModal
        show={openAddModal}
        handleClose={handleCloseAddModal}
        handleSave={handleAddCuisineSuccess}
      />

      <EditCuisinesModal
        show={openEditModal}
        handleClose={handleCloseEditModal}
        bannerToEdit={selectedCuisine}
        handleUpdate={handleEditCuisineSuccess}
      />

      <DeleteCusinesModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        cuisineToDelete={cuisineToDelete}
        onDeleteCuisine={handleConfirmDeleteCuisine}
      />

      {loading && <Loader />}
    </>
  );
};

export default CuisinesTable;
