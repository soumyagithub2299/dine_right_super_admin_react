import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditCourseModal({ show, handleClose, bannerToEdit, handleUpdate }) {
  const [image, setImage] = useState("");
  const [sideImage, setSideImage] = useState(""); 
  const [text, setText] = useState("");
  const [description, setDescription] = useState(""); 

  useEffect(() => {
    if (bannerToEdit) {
      setImage(bannerToEdit.image); // Set initial Course Image
      setSideImage(bannerToEdit.sideImage); // Set initial Course Side Image
      setText(bannerToEdit.text); // Set initial text
      setDescription(bannerToEdit.description); // Set initial description
    }
  }, [bannerToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set Course Image preview after file upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSideImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSideImage(reader.result); // Set Course Side Image preview after file upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    handleUpdate({ ...bannerToEdit, image, sideImage, text, description }); 
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Edit Banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Input for Course Side Image */}
          <Form.Group controlId="formSideImage">
            <Form.Label>Course Side Image</Form.Label>
            {sideImage && <img src={sideImage} alt="Side Image Preview" style={{ width: "90%", marginBottom: "10px" }} />}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleSideImageChange}
            />
          </Form.Group>

          {/* Input for Course Image */}
          <Form.Group controlId="formImage" style={{ marginTop: "15px" }}>
            <Form.Label>Course Image</Form.Label>
            {image && <img src={image} alt="Banner Preview" style={{ width: "90%", marginBottom: "10px" }} />}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          {/* Input for Course Name */}
          <Form.Group controlId="formText" style={{ marginTop: "15px" }}>
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          {/* Input for Description */}
          <Form.Group controlId="formDescription" style={{ marginTop: "15px" }}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            />
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
}

export default EditCourseModal;
