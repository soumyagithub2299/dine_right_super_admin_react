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
} from "@mui/material";
import Loader from "../../Loader/Loader";
import EditBannerForm from "../EditBannerForm/EditBannerForm";
import AddBannerForm from "../AddBannerForm/AddBannerForm";
import DeleteBannerForm from "../DeleteBannerForm/DeleteBannerForm";  // Import the DeleteBannerForm
import { toast } from "react-toastify";

const BannerTable = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State to control delete modal
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [bannerToDelete, setBannerToDelete] = useState(null);  // State to store banner to delete

  // Dummy banner data for simulation
  const dummyData = [
    {
      id: 1,
      title: "Summer Sale",
      image: "https://via.placeholder.com/100x50?text=Summer+Sale",
      url: "https://www.example.com/summer-sale",
    },
    {
      id: 2,
      title: "Winter Collection",
      image: "https://via.placeholder.com/100x50?text=Winter+Collection",
      url: "https://www.example.com/winter-collection",
    },
    {
      id: 3,
      title: "Black Friday Deals",
      image: "https://via.placeholder.com/100x50?text=Black+Friday+Deals",
      url: "https://www.example.com/black-friday-deals",
    },
  ];

  const getAllBannerData = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setBanners(dummyData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching banner data: " + error.message);
      setLoading(false);
    }
  };

  const handleAddBanner = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleAddBannerSuccess = () => {
    getAllBannerData(); // Refresh the banner list
  };

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedBanner(null);
  };

  const handleEditBannerSuccess = () => {
    getAllBannerData(); // Refresh the banner list
  };

  const handleDeleteBanner = (banner) => {
    setBannerToDelete(banner);
    setOpenDeleteModal(true);  // Open the delete modal
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setBannerToDelete(null);  // Reset banner to delete
  };

  const handleConfirmDeleteBanner = (banner) => {
    // Perform delete operation here
    const updatedBanners = banners.filter((b) => b.id !== banner.id);
    setBanners(updatedBanners);
    toast.success(`${banner.title} banner deleted successfully!`);
    handleCloseDeleteModal();  // Close modal after deletion
  };

  useEffect(() => {
    getAllBannerData();
  }, []);

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
        onClick={handleAddBanner}
      >
        Add Banner
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SR No.</TableCell>
              <TableCell>Banner Title</TableCell>
              <TableCell>Banner Image</TableCell>
              <TableCell>Banner URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner, index) => (
              <TableRow key={banner.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{banner.title}</TableCell>
                <TableCell>
                  <img src={banner.image} alt={banner.title} width="100" />
                </TableCell>
                <TableCell>
                  <Link
                    href={banner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {banner.url}
                  </Link>
                </TableCell>
                <TableCell style={{ gap: "10px", display: "flex" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditBanner(banner)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteBanner(banner)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddBannerForm
        open={openAddModal}
        onClose={handleCloseAddModal}
        onAddBanner={handleAddBannerSuccess}
      />

      <EditBannerForm
        open={openEditModal}
        onClose={handleCloseEditModal}
        selectedBanner={selectedBanner}
        onEditBanner={handleEditBannerSuccess}
      />

      <DeleteBannerForm
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        bannerToDelete={bannerToDelete}
        onDeleteBanner={handleConfirmDeleteBanner}
      />

      {loading && <Loader />}
    </>
  );
};

export default BannerTable;
