import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddCourseModal({ show, handleClose, handleSave }) {
  const [bannerText, setBannerText] = useState("");
  const [bannerImage, setBannerImage] = useState(null); // For course image
  const [sideImage, setSideImage] = useState(null); // For course side image
  const [description, setDescription] = useState(""); // For course description

  const handleBannerImageChange = (e) => {
    setBannerImage(URL.createObjectURL(e.target.files[0])); // Preview the course image
  };

  const handleSideImageChange = (e) => {
    setSideImage(URL.createObjectURL(e.target.files[0])); // Preview the course side image
  };

  const handleSubmit = () => {
    if (bannerText && bannerImage && sideImage && description) {
      handleSave(bannerText, bannerImage, sideImage, description); // Pass both images, text, and description
      handleClose(); 
    } else {
      alert("Please provide course name, course side image, course image, and description.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Add New Banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSideImage" className="mb-3">
            <Form.Label>Course Side Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleSideImageChange} />
          </Form.Group>

          <Form.Group controlId="formBannerImage" className="mb-3">
            <Form.Label>Course Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleBannerImageChange} />
          </Form.Group>

          <Form.Group controlId="formBannerText">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              placeholder="Enter Course name"
            />
          </Form.Group>

          <Form.Group controlId="formDescription" style={{ marginTop: "15px" }}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCourseModal;
