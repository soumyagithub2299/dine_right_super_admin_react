import React, { useState } from 'react';
import AddBlogForm from './AddBlogForm/AddBlogForm';
import BlogTable from './BlogTable/BlogTable';
import EditBlogModal from './BlogTable/EditBlogModal/EditBlogModal';
import DeleteBlogModal from './BlogTable/DeleteBlogModal/DeleteBlogModal';
import { Button } from 'react-bootstrap';


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Adding a new blog
  const addBlog = (newBlog) => {
    setBlogs([...blogs, { ...newBlog, id: blogs.length + 1 }]);
  };

  // Updating a blog
  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
  };

  // Deleting a blog
  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  // Handle Edit button click
  const handleEditClick = (blog) => {
    setSelectedBlog(blog);  // Set selected blog for editing
    setShowEditModal(true); // Show the Edit modal
  };

  // Handle Delete button click
  const handleDeleteClick = (blogId) => {
    setSelectedBlog(blogs.find(blog => blog.id === blogId));  // Set selected blog for deletion
    setShowDeleteModal(true);  // Show the Delete modal
  };









  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddBlog = (blogData) => {
    // Do something with the new blog data
    console.log('Blog added:', blogData);
  };




  return (
    <div>

<div style={{ textAlign: 'right', padding: '20px', margin: '20px 0' }}>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        style={{
          backgroundColor: '#4CAF50', // Change button background color
          color: '#FFFFFF', // Button text color
          padding: '10px 20px', // Padding
          borderRadius: '8px', // Rounded corners
          fontSize: '16px', // Font size
          fontWeight: '500', // Font weight
          transition: 'background-color 0.3s ease', // Smooth transition for hover effect
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#388E3C'; // Background color on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#4CAF50'; // Revert background color
        }}
      >
        Add New Blog
      </Button>

      <AddBlogForm open={isModalOpen} onClose={handleCloseModal} onAddBlog={handleAddBlog} />
    </div>


    
      <BlogTable 
        blogs={blogs} 
        onEditClick={handleEditClick} 
        onDeleteClick={handleDeleteClick} 
      />

      {/* Edit Modal */}
      {selectedBlog && (
        <EditBlogModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          blog={selectedBlog}
          onUpdateBlog={updateBlog}
        />
      )}

      {/* Delete Confirmation Modal */}
      {selectedBlog && (
        <DeleteBlogModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          blogId={selectedBlog.id}
          onDeleteBlog={deleteBlog}
        />
      )}
    </div>
  );
};

export default Blog;




// import React, { useState, useEffect } from 'react';
// import AddBlogForm from './AddBlogForm/AddBlogForm';
// import BlogTable from './BlogTable/BlogTable';
// import EditBlogModal from './BlogTable/EditBlogModal/EditBlogModal';
// import DeleteBlogModal from './BlogTable/DeleteBlogModal/DeleteBlogModal';
// import Loader from '../Loader/Loader';
// // import Loader from '../../Loader/Loader'; // Import the Loader component

// const Blog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state

//   const token = localStorage.getItem('superAdminTokenDineRight');

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setLoading(true); // Set loading to true before fetching
//       try {
//         const response = await fetch('https://dineright.techfluxsolutions.com/api/auth/getAllBlogs', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch blogs');
//         }
//         const data = await response.json();
//         setBlogs(data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchBlogs();
//   }, [token]);

//   const addBlog = (newBlog) => {
//     setBlogs([...blogs, { ...newBlog, id: blogs.length + 1 }]);
//   };

//   const updateBlog = (updatedBlog) => {
//     setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
//   };

//   const deleteBlog = (id) => {
//     setBlogs(blogs.filter(blog => blog.id !== id));
//   };

//   const handleEditClick = (blog) => {
//     setSelectedBlog(blog);
//     setShowEditModal(true);
//   };

//   const handleDeleteClick = (blogId) => {
//     setSelectedBlog(blogs.find(blog => blog.id === blogId));
//     setShowDeleteModal(true);
//   };

//   // Show loader while fetching data
//   if (loading) {
//     return <Loader />; // Show loader while loading
//   }

//   return (
//     <div>
//       <AddBlogForm onAddBlog={addBlog} />
//       <BlogTable 
//         blogs={blogs} 
//         onEditClick={handleEditClick} 
//         onDeleteClick={handleDeleteClick} 
//       />

//       {/* Edit Modal */}
//       {selectedBlog && (
//         <EditBlogModal
//           show={showEditModal}
//           handleClose={() => setShowEditModal(false)}
//           blog={selectedBlog}
//           onUpdateBlog={updateBlog}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {selectedBlog && (
//         <DeleteBlogModal
//           show={showDeleteModal}
//           handleClose={() => setShowDeleteModal(false)}
//           blogId={selectedBlog.id}
//           onDeleteBlog={deleteBlog}
//         />
//       )}
//     </div>
//   );
// };

// export default Blog;


