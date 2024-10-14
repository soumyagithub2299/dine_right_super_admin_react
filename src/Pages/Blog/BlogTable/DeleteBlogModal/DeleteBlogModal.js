import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteBlogModal = ({ show, handleClose, blogId, onDeleteBlog }) => {
  const handleDelete = () => {
    onDeleteBlog(blogId);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className='add-blog-form'>
      <Modal.Header closeButton>
        <Modal.Title className='add-blog-form'>Delete Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body className='add-blog-form'>
        Are you sure you want to delete this blog post?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBlogModal;
