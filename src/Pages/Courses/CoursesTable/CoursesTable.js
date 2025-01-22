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
import { toast } from "react-toastify";
import AddCourse from "../AddCourse/AddCourse";
import EditCourse from "../EditCourse/EditCourse";
import DeleteCourse from "../DeleteCourse/DeleteCourse";

const CoursesTable = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const dummyData = [
    {
      id: 1,
      title: "Summer Sale",
      image: "https://via.placeholder.com/100x50?text=Summer+Sale",
      courseImage: "https://via.placeholder.com/100x50?text=Course+Image+1",
      url: "https://www.example.com/summer-sale",
      description: "This is the description for the Summer Sale course. It has more details about the course content.",
    },
    {
      id: 2,
      title: "Winter Collection",
      image: "https://via.placeholder.com/100x50?text=Winter+Collection",
      courseImage: "https://via.placeholder.com/100x50?text=Course+Image+2",
      url: "https://www.example.com/winter-collection",
      description: "This is the description for the Winter Collection course. It includes a lot of valuable information.",
    },
    {
      id: 3,
      title: "Black Friday Deals",
      image: "https://via.placeholder.com/100x50?text=Black+Friday+Deals",
      courseImage: "https://via.placeholder.com/100x50?text=Course+Image+3",
      url: "https://www.example.com/black-friday-deals",
      description: "This is the description for the Black Friday Deals course. You will find detailed insights here.",
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
    getAllBannerData();
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
    getAllBannerData();
  };

  const handleDeleteBanner = (banner) => {
    setBannerToDelete(banner);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setBannerToDelete(null);
  };

  const handleConfirmDeleteBanner = (banner) => {
    const updatedBanners = banners.filter((b) => b.id !== banner.id);
    setBanners(updatedBanners);
    toast.success(`${banner.title} banner deleted successfully!`);
    handleCloseDeleteModal();
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderDescription = (description, id) => {
    const words = description.split(" ");
    const isExpanded = expandedDescriptions[id];
    if (words.length <= 5 || isExpanded) {
      return (
        <>
          {description}
          {words.length > 5 && (
            <span onClick={() => toggleDescription(id)} style={{ color: "blue", cursor: "pointer" }}>
              {isExpanded ? " Read Less" : ""}
            </span>
          )}
        </>
      );
    }
    return (
      <>
        {words.slice(0, 5).join(" ")}...
        <span onClick={() => toggleDescription(id)} style={{ color: "blue", cursor: "pointer" }}>
          Read More
        </span>
      </>
    );
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
        Add Course
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SR No.</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Cover Photo</TableCell>
              <TableCell>Course Image</TableCell>
              <TableCell>Course URL</TableCell>
              <TableCell style={{width:"20%"}}>Course Description</TableCell>
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
                  <img src={banner.courseImage} alt="Course" width="100" />
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
                <TableCell>{renderDescription(banner.description, banner.id)}</TableCell>
                <TableCell>
                  <div style={{display:"flex",gap:"10px"}}>
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCourse
        open={openAddModal}
        onClose={handleCloseAddModal}
        onAddBanner={handleAddBannerSuccess}
      />

      <EditCourse
        open={openEditModal}
        onClose={handleCloseEditModal}
        selectedBanner={selectedBanner}
        onEditBanner={handleEditBannerSuccess}
      />

      <DeleteCourse
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        bannerToDelete={bannerToDelete}
        onDeleteBanner={handleConfirmDeleteBanner}
      />

      {loading && <Loader />}
    </>
  );
};

export default CoursesTable;
