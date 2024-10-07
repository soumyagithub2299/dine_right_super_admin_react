import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./EditRestroModal.css";

const EditRestroModal = ({
  show,
  handleClose,
  restaurant,
  setRestaurant,
  handleSubmit,
}) => {
  
  const handleCommissionChange = (e) => {
    const value = e.target.value;

  
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setRestaurant({ ...restaurant, commission: value });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      
      <Modal.Header>
        <Modal.Title>Edit Restaurant</Modal.Title>
      </Modal.Header>
      
      
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="restaurantStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={restaurant.status}
              onChange={(e) => setRestaurant({ ...restaurant, status: e.target.value })}
            >
              <option value="confirmed">Approved</option>
              <option value="cancelled">Unapproved</option>
            </Form.Control>
          </Form.Group>
          
          
          <Form.Group controlId="restaurantCommission" className="mt-2">
            <Form.Label>% Wise Commission</Form.Label>
            <Form.Control
              type="text" 
              value={restaurant.commission}
              onChange={handleCommissionChange} 
              placeholder="Enter commission percentage"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit} className="btn-saveChanges-guest">
          Save Changes
        </Button>
        <Button variant="secondary" onClick={handleClose} className="btn-cancel-guest">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRestroModal;
   

// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify"; 
// import "./EditRestroModal.css";
// import { EditRestaurantStatusinAPI } from "./../../../utils/APIs/RestaurantApis/RestaurantApi"; 

// const EditRestroModal = ({
//   show,
//   handleClose,
//   restaurant,
//   setRestaurant,
//   handleSubmit, 
// }) => {
//   const [loading, setLoading] = useState(false);

  
//   const handleCommissionChange = (e) => {
//     const value = e.target.value;

//     if (/^\d*\.?\d*$/.test(value) || value === "") {
//       setRestaurant({ ...restaurant, commission: value });
//     }
//   };

  
//   const handleFormSubmit = async (e) => {
//     e.preventDefault(); 
//     setLoading(true); 

//     try {
//       const response = await EditRestaurantStatusinAPI({
//         status: restaurant.status,
//         commission: restaurant.commission,
//       });

//       setLoading(false); 

//       if (response?.data?.response === true) {
//         toast.success("Restaurant updated successfully!"); 
//         handleSubmit(); 
//         handleClose(); 
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("Failed to update restaurant. Please try again."); 
//       console.error("Failed to update restaurant", error);
//     }
//   };

//   return (
//     <>
//       <ToastContainer /> 

//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header>
//           <Modal.Title>Edit Restaurant</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group controlId="restaurantStatus">
//               <Form.Label>Status</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={restaurant.status}
//                 onChange={(e) =>
//                   setRestaurant({ ...restaurant, status: e.target.value })
//                 }
//               >
//                 <option value="confirmed">Approved</option>
//                 <option value="cancelled">Unapproved</option>
//               </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="restaurantCommission" className="mt-2">
//               <Form.Label>% Wise Commission</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={restaurant.commission}
//                 onChange={handleCommissionChange}
//                 placeholder="Enter commission percentage"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button
//             variant="primary"
//             type="submit"
//             onClick={handleFormSubmit}
//             disabled={loading} 
//             className="btn-saveChanges-guest"
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </Button>
//           <Button
//             variant="secondary"
//             onClick={handleClose}
//             className="btn-cancel-guest"
//           >
//             Cancel
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default EditRestroModal;



