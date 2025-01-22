import React, { useState } from "react";
import AddBlogForm from "./AddBlogForm/AddBlogForm";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const Blog = () => {
  const [loading, setLoading] = useState(false);

  const getAllBlogData = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      const response = await axios.get(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/getAllBlogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.response === true) {
        setBlogs(response?.data?.blogs);
      } else {
        console.log(response.data.error_msg || "Failed to fetch blog data");
      }
    } catch (error) {
      console.log("Error fetching blog data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogData();
  }, []);

  const [blogs, setBlogs] = useState([]);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Pagination
  const blogsPerPage = 10;
  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    // getAllBlogData();
  };

  const handleAddBlog = (blogData) => {
    setBlogs((prevBlogs) => [...prevBlogs, { ...blogData, id: Date.now() }]); // Assign a unique id
    handleCloseModal();
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setConfirmDelete(true);
  };

  const confirmDeleteBlog = async () => {
    const body = {
      blog_id: blogToDelete?.blog_id,
    };

    setLoading(true);

    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/app/deleteBlog`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.response === true) {
        getAllBlogData();
        setConfirmDelete(false);
        setBlogToDelete(null);

        toast.success("Blog deleted successfully!");
      } else {
        toast.error(response.data.error_msg || "Failed to delete blog");
      }
    } catch (error) {
      toast.error("Error adding/editing blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setConfirmDelete(false);
    setBlogToDelete(null);
  };

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div>
        <div style={{ textAlign: "right", margin: "20px 0" }}>
          <Button
            variant="contained"
            onClick={handleOpenModal}
            style={{
              backgroundColor: "#4CAF50",
              color: "#FFFFFF",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#388E3C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4CAF50";
            }}
          >
            Add New Blog
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "8.33%" }}>Sr.</TableCell>{" "}
                {/* 1/12 */}
                <TableCell style={{ width: "16.66%" }}>Image</TableCell>{" "}
                {/* 2/12 */}
                <TableCell style={{ width: "25%" }}>Title</TableCell>{" "}
                {/* 3/12 */}
                <TableCell style={{ width: "25%" }}>Description</TableCell>{" "}
                {/* 3/12 */}
                <TableCell style={{ width: "25%" }}>Actions</TableCell>{" "}
                {/* 3/12 */}
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs
                .slice(
                  currentPage * blogsPerPage,
                  (currentPage + 1) * blogsPerPage
                )
                .map((blog, index) => (
                  <TableRow key={blog.blog_id}>
                    <TableCell>
                      {index + 1 + currentPage * blogsPerPage}
                    </TableCell>
                    <TableCell>
                      <img
                        src={blog.blog_image_url}
                        alt="Blog"
                        style={{
                          width: "100px", // Set the desired width
                          height: "auto", // Maintain aspect ratio
                          borderRadius: "5px", // Optional: Add rounded corners
                        }}
                      />
                    </TableCell>

                    <TableCell>{blog.blog_title}</TableCell>
                    <TableCell>{blog.blog_description}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(blog)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(blog)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            disabled={currentPage === 0}
            onClick={() => handlePageChange("previous")}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={currentPage === pageCount - 1}
            onClick={() => handlePageChange("next")}
          >
            Next
          </Button>
        </div>

        {/* Confirmation Dialog for Delete */}
        <Dialog open={confirmDelete} onClose={handleCloseDeleteConfirmation}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{" "}
              <span style={{ fontWeight: "bold", color: "red" }}>
                {blogToDelete?.blog_title}
              </span>{" "}
              blog?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteConfirmation} color="primary">
              No
            </Button>
            <Button onClick={confirmDeleteBlog} color="error">
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <AddBlogForm
            open={isModalOpen}
            onClose={handleCloseModal}
            onAddBlog={handleAddBlog}
            selectedBlog={selectedBlog}
            getAllBlogData={getAllBlogData}
          />
        </Dialog>
      </div>
    </>
  );
};

export default Blog;
