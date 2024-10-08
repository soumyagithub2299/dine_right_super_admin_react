import React, { useState } from "react";
import "./GuestTableRestro.css";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbCornerUpLeft } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import OrdersModal from "../OrdersModal/OrdersModal";

const initialGuestData = [
  {
    id: 1,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    image: "./assets/images/Guests/guest-img-1.jpg",
    payment: "Cash",
    time: "21:00-22:00",
    date: "Jan 6, 2022",
    status: "confirmed",
    statusIcon: <IoMdCheckmark />,
  },
  {
    id: 2,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    image: "./assets/images/Guests/guest-img-2.jpg",
    payment: "Card",
    time: "10:00-22:00",
    date: "Jan 7, 2022",
    status: "cancelled",
    statusIcon: <RxCross2 />,
  },
  {
    id: 3,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    image: "./assets/images/Guests/guest-img-1.jpg",
    payment: "Cash",
    time: "9:00-22:00",
    date: "Jan 8, 2022",
    status: "refund",
    statusIcon: <TbCornerUpLeft />,
  },
  // ... other guest data
];

const GuestTableRestro = () => {
  const [guestData, setGuestData] = useState(initialGuestData);
  const [currentPage, setCurrentPage] = useState(0);
  const [guestsPerPage] = useState(5);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const pageCount = Math.ceil(guestData.length / guestsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOrdersClick = (guest) => {
    const orderDetails = {
      items: ["Spinach Salad", "Red Sauce Pasta", "Margarita Pizza"],
      comment: "Birthday Celebration",
    };
    setSelectedOrderDetails(orderDetails);
    setShowOrdersModal(true);
  };

  const handleCloseOrdersModal = () => {
    setShowOrdersModal(false);
    setSelectedOrderDetails(null);
  };

  const indexOfLastGuest = (currentPage + 1) * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guestData.slice(indexOfFirstGuest, indexOfLastGuest);

  return (
    <div className="p-3">
      <div className="table-responsive">
        <table className="table table-bordered table-guest">
          <thead className="heading_guest">
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Guest Name</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">Payment</th>
              <th scope="col">Orders</th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((guest, index) => (
              <tr key={guest.id}>
                <th scope="row" className="id-guest">
                  {indexOfFirstGuest + index + 1}
                </th>
                <td>
                  <div className="container container-guest">
                    <div className="pic-email-guest">
                      <div className="col-6 col-md-2">
                        <img
                          className="img-guest"
                          src={guest.image}
                          alt={guest.name}
                        />
                      </div>
                      <div className="col-6 col-md-4">
                        <div className="row name-email-guest">
                          <div className="name-guest">{guest.name}</div>
                          <div className="email-guest">{guest.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-guest">{guest.payment}</td> {/* Updated payment method display */}
                <td className="text-guest">{guest.time}</td>
                <td className="text-guest">{guest.date}</td>
                <td className={`status ${guest.status}`}>
                  <div className={`status-background-${guest.status}`}>
                    {guest.statusIcon}{" "}
                    {guest.status.charAt(0).toUpperCase() +
                      guest.status.slice(1)}
                  </div>
                </td>
                <td
                  className="edit_guests"
                  onClick={() => handleOrdersClick(guest)}
                >
                  Orders
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="10" className="pagination-row">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedOrderDetails && (
        <OrdersModal
          show={showOrdersModal}
          handleClose={handleCloseOrdersModal}
          orderDetails={selectedOrderDetails}
        />
      )}
    </div>
  );
};

export default GuestTableRestro;
 




// import React, { useState, useEffect } from "react";
// import "./GuestTableRestro.css";
// import { IoMdCheckmark } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { TbCornerUpLeft } from "react-icons/tb";
// import ReactPaginate from "react-paginate";
// import OrdersModal from "../OrdersModal/OrdersModal";
// import { GuestTableOfRestaurantModalAPI } from "../../../utils/APIs/RestaurantApis/RestaurantApi"; // Import the API function
// import { toast, ToastContainer } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css";


// const GuestTableRestro = () => {
//   const [guestData, setGuestData] = useState([]); 
//   const [loading, setLoading] = useState(false); 
//   const [currentPage, setCurrentPage] = useState(0);
//   const [guestsPerPage] = useState(5);
//   const [showOrdersModal, setShowOrdersModal] = useState(false);
//   const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

//   const pageCount = Math.ceil(guestData.length / guestsPerPage);

 
//   const fetchGuestTableData = async () => {
//     try {
//       setLoading(true);
//       const response = await GuestTableOfRestaurantModalAPI();

//       setLoading(false); 
//       if (
//         response &&
//         response.data &&
//         response.data.response === true &&
//         response.data.data
//       ) {
        
//         const guests = response.data.data.guests; 

//         setGuestData(guests); 
//       } else {
//         throw new Error("Failed to fetch guest data"); 
//       }
//     } catch (error) {
//       setLoading(false); 
//       toast.error("Failed to load guest data. Please try again."); 
//       console.error("Error fetching guest data:", error);
//     }
//   };

  
//   useEffect(() => {
//     fetchGuestTableData(); 
//   }, []);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleOrdersClick = (guest) => {
//     const orderDetails = {
//       items: ["Spinach Salad", "Red Sauce Pasta", "Margarita Pizza"],
//       comment: "Birthday Celebration",
//     };
//     setSelectedOrderDetails(orderDetails);
//     setShowOrdersModal(true);
//   };

//   const handleCloseOrdersModal = () => {
//     setShowOrdersModal(false);
//     setSelectedOrderDetails(null);
//   };

//   const indexOfLastGuest = (currentPage + 1) * guestsPerPage;
//   const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
//   const currentGuests = guestData.slice(indexOfFirstGuest, indexOfLastGuest);

//   return (
//     <div className="p-3">
//       <ToastContainer /> 
      
//       {loading ? (
//         <p>Loading guest data...</p> 
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-guest">
//             <thead className="heading_guest">
//               <tr>
//                 <th scope="col">Sr No.</th>
//                 <th scope="col">Guest Name</th>
//                 <th scope="col">Payment Method</th>
//                 <th scope="col">Time</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Payment</th>
//                 <th scope="col">Orders</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentGuests.length > 0 ? (
//                 currentGuests.map((guest, index) => (
//                   <tr key={guest.id}>
//                     <th scope="row" className="id-guest">
//                       {indexOfFirstGuest + index + 1}
//                     </th>
//                     <td>
//                       <div className="container container-guest">
//                         <div className="pic-email-guest">
//                           <div className="col-6 col-md-2">
//                             <img
//                               className="img-guest"
//                               src={guest.image}
//                               alt={guest.name}
//                             />
//                           </div>
//                           <div className="col-6 col-md-4">
//                             <div className="row name-email-guest">
//                               <div className="name-guest">{guest.name}</div>
//                               <div className="email-guest">{guest.email}</div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-guest">{guest.payment}</td>
//                     <td className="text-guest">{guest.time}</td>
//                     <td className="text-guest">{guest.date}</td>
//                     <td className={`status ${guest.status}`}>
//                       <div className={`status-background-${guest.status}`}>
//                         {guest.statusIcon}{" "}
//                         {guest.status.charAt(0).toUpperCase() +
//                           guest.status.slice(1)}
//                       </div>
//                     </td>
//                     <td
//                       className="edit_guests"
//                       onClick={() => handleOrdersClick(guest)}
//                     >
//                       Orders
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">No guests found.</td>
//                 </tr>
//               )}

//               <tr>
//                 <td colSpan="10" className="pagination-row">
//                   <ReactPaginate
//                     previousLabel={"Previous"}
//                     nextLabel={"Next"}
//                     breakLabel={"..."}
//                     pageCount={pageCount}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={3}
//                     onPageChange={handlePageClick}
//                     containerClassName={"pagination justify-content-center"}
//                     pageClassName={"page-item"}
//                     pageLinkClassName={"page-link"}
//                     previousClassName={"page-item"}
//                     previousLinkClassName={"page-link"}
//                     nextClassName={"page-item"}
//                     nextLinkClassName={"page-link"}
//                     breakClassName={"page-item"}
//                     breakLinkClassName={"page-link"}
//                     activeClassName={"active"}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selectedOrderDetails && (
//         <OrdersModal
//           show={showOrdersModal}
//           handleClose={handleCloseOrdersModal}
//           orderDetails={selectedOrderDetails}
//         />
//       )}
//     </div>
//   );
// };

// export default GuestTableRestro;
