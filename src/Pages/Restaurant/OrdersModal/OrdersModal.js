
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./OrdersModal.css";

const OrdersModal = ({ show, handleClose, orderDetails }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title className="order-title">Orders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
          <div className="col-12 col-md-6">
          <h5>Order Items :</h5>
          </div>
          <div className="col-12 col-md-6">
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
          </div>
        <div>
          <hr/>
          <div className="row">
          <div className="col-12 col-md-6">
          <h5>Booking Comment :</h5>
          </div>
          <div className="col-12 col-md-6 Sub-Booking-comment">
          <p>{orderDetails.comment}</p>
        </div>
        </div>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-cancel-user" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrdersModal;
 





// import React, { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import "./OrdersModal.css";
// import { OrderOfUserRestaurantModalAPI } from "../../../utils/APIs/RestaurantApis/RestaurantApi"; // Ensure the correct path to your API file

// const OrdersModal = ({ show, handleClose, selectedUserId }) => {
//   const [orderDetails, setOrderDetails] = useState({
//     items: [],
//     comment: "",
//   });
//   const [loading, setLoading] = useState(false);

  
//   const fetchOrderDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await OrderOfUserRestaurantModalAPI(selectedUserId);

//       if (
//         response &&
//         response.data &&
//         response.data.response &&
//         response.data.response.response === true &&
//         response.data.response.data
//       ) {
//         const details = response.data.response.data;
//         setOrderDetails({
//           items: details.items || [],
//           comment: details.comment || "No comment available",
//         });
//       } else {
//         toast.error("Failed to fetch order details."); 
//       }
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//       toast.error("An error occurred while fetching the order details."); 
//     } finally {
//       setLoading(false);
//     }
//   };

 
//   useEffect(() => {
//     if (show && selectedUserId) {
//       fetchOrderDetails();
//     }
//   }, [show, selectedUserId]);

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header>
//         <Modal.Title className="order-title">Orders</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {loading ? (
//           <div className="loading-spinner">Loading...</div> 
//         ) : (
//           <div className="container">
//             <div className="row">
//               <div className="col-12 col-md-6">
//                 <h5>Order Items :</h5>
//               </div>
//               <div className="col-12 col-md-6">
//                 <ul>
//                   {orderDetails.items.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div>
//               <hr />
//               <div className="row">
//                 <div className="col-12 col-md-6">
//                   <h5>Booking Comment :</h5>
//                 </div>
//                 <div className="col-12 col-md-6 Sub-Booking-comment">
//                   <p>{orderDetails.comment}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button className="btn-cancel-user" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default OrdersModal;
