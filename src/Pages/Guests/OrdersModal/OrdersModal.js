
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
        <Button className="btn-cancel-guest" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrdersModal;




// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { OrderModalAPI } from "./../../../utils/APIs/GuestsApis/GuestsApi"; 
// import "./OrdersModal.css";
// import { toast } from "react-toastify";

// const OrdersModal = ({ show, handleClose, orderDetails }) => {
//   const [loading, setLoading] = useState(false);
//   const [orderData, setOrderData] = useState(orderDetails || { items: [], comment: "" }); // Initialize with default or passed data

//   const getOrderDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await OrderModalAPI(); // API call
//       setLoading(false);

//       if (
//         response &&
//         response?.data?.response &&
//         response?.data?.response?.response === true &&
//         response?.data?.response?.data
//       ) {
//         const details = response?.data?.response?.data;

        
//         setOrderData({
//           items: details.items || [],
//           comment: details.comment || "No comments available.",
//         });
//       } else {
//         toast.error("Failed to load order details.");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("An error occurred while fetching order details.");
//     }
//   };

//   useEffect(() => {
//     if (show) {
//       getOrderDetails(); 
//     }
//   }, [show]);

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header>
//         <Modal.Title className="order-title">Orders</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="container">
//           <div className="row">
//             <div className="col-12 col-md-6">
//               <h5>Order Items :</h5>
//             </div>
//             <div className="col-12 col-md-6">
//               {loading ? (
//                 <p>Loading...</p> 
//               ) : (
//                 <ul>
//                   {orderData.items.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//           <div>
//             <hr />
//             <div className="row">
//               <div className="col-12 col-md-6">
//                 <h5>Booking Comment :</h5>
//               </div>
//               <div className="col-12 col-md-6 Sub-Booking-comment">
//                 {loading ? <p>Loading...</p> : <p>{orderData.comment}</p>}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button className="btn-cancel-guest" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default OrdersModal;
