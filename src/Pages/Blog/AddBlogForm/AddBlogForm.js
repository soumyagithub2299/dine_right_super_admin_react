// import React, { useState } from 'react';
// import { Form, Button, Image, Col, Row, Container } from 'react-bootstrap';
// import "./AddBlogForm.css"
// const AddBlogForm = ({ onAddBlog }) => {
//   const [imagePreview, setImagePreview] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newBlog = {
//       image: imagePreview, // Image preview as the base64 string
//       title,
//       description,
//     };
//     onAddBlog(newBlog);
//     setTitle('');
//     setDescription('');
//     setImagePreview(null); // Clear after submit
//   };

//   return (
//     <div className="add-blog-form p-4 mb-4 " style={{ maxWidth:'90%', backgroundColor: '#ffffff', borderRadius: '10px' }}>
//       <h3 className=" mb-4">Create New Blog</h3>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formImageUpload">
//           <Form.Label>Upload Image</Form.Label>
//           <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
//         </Form.Group>

//         {imagePreview && (
//           <div className="text-center my-3">
//             <Image src={imagePreview} alt="Preview" thumbnail width="150" />
//           </div>
//         )}

//         <Form.Group controlId="formTitle">
//           <Form.Label>Blog Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter blog title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formDescription">
//           <Form.Label>Blog Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter blog description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Row className="mt-4">
//           <Col className="d-flex justify-content-center">
//             <Button variant="primary" type="submit">
//               Add Blog
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   );
// };

// export default AddBlogForm;



import React, { useState } from 'react';
import { Form, Button, Image, Col, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddBlogForm.css';
import Loader from '../../Loader/Loader';

const AddBlogForm = ({ onAddBlog }) => {
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
  
    setLoading(true); // Start loading

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
      }

      const data = await response.json();
      onAddBlog(data);
      toast.success('Blog added successfully!');
      // Clear form fields
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      toast.error('Error adding blog: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="add-blog-form p-4 mb-4" style={{ maxWidth: '90%', backgroundColor: '#ffffff', borderRadius: '10px' }}>
      <h3 className="mb-4">Create New Blog</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formImageUpload">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
        </Form.Group>

        {imagePreview && (
          <div className="text-center my-3">
            <Image src={imagePreview} alt="Preview" thumbnail width="150" />
          </div>
        )}

        <Form.Group controlId="formTitle">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Blog Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Blog
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer /> {/* Keep ToastContainer here */}
    </div>
  );
};

export default AddBlogForm;


