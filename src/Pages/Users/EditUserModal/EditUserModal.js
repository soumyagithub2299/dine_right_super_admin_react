import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditUserModal.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserModal = ({ show, handleClose, user, setUser, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="text"
              value={user.mobile}
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              value={user.time}
              onChange={(e) => setUser({ ...user, time: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              value={user.date}
              onChange={(e) => setUser({ ...user, date: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={user.status}
              onChange={(e) => setUser({ ...user, status: e.target.value })}
            >
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refund">Refunded</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>People</Form.Label>
            <Form.Control
              type="number"
              value={user.people}
              onChange={(e) => setUser({ ...user, people: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Table</Form.Label>
            <Form.Control
              type="text"
              value={user.table}
              onChange={(e) => setUser({ ...user, table: e.target.value })}
            />
          </Form.Group>

          <Button  type="submit" className='btn-saveChanges-user mt-3'>
            Save Changes
          </Button>
          <Button  onClick={handleClose} className='btn-cancel-user mt-3 ml-2'>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
