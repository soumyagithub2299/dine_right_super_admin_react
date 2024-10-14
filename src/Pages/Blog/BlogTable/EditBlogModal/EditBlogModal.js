import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditBlogModal = ({ show, handleClose, blog, onUpdateBlog }) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [imagePreview, setImagePreview] = useState(blog.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const updatedBlog = {
      ...blog,
      title,
      description,
      image: imagePreview,
    };
    onUpdateBlog(updatedBlog);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className='add-blog-form'>
      <Modal.Header closeButton>
        <Modal.Title className='add-blog-form'>Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='add-blog-form'>
          <Form.Group controlId="formBlogTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBlogDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBlogImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" width="100" className="mt-2" />}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBlogModal;
