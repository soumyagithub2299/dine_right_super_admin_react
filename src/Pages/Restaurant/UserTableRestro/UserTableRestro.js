import React, { useState } from "react";
import "./UserTableRestro.css";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbCornerUpLeft } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import OrdersModal from "../OrdersModal/OrdersModal";

const initialUserData = [
  {
    id: 1,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    image: "./assets/images/Users/user-img-1.jpg",
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
    image: "./assets/images/Users/user-img-2.jpg",
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
    image: "./assets/images/Users/user-img-1.jpg",
    payment: "Cash",
    time: "9:00-22:00",
    date: "Jan 8, 2022",
    status: "refund",
    statusIcon: <TbCornerUpLeft />,
  },
  // ... other user data
];

const UserTableRestro = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(5);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const pageCount = Math.ceil(userData.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOrdersClick = (user) => {
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

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-3">
      <div className="table-responsive">
        <table className="table table-bordered table-user">
          <thead className="heading_user">
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">User Name</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">Payment</th>
              <th scope="col">Orders</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <th scope="row" className="id-user">
                  {indexOfFirstUser + index + 1}
                </th>
                <td>
                  <div className="container container-user">
                    <div className="pic-email-user">
                      <div className="col-6 col-md-2">
                        <img
                          className="img-user"
                          src={user.image}
                          alt={user.name}
                        />
                      </div>
                      <div className="col-6 col-md-4">
                        <div className="row name-email-user">
                          <div className="name-user">{user.name}</div>
                          <div className="email-user">{user.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-user">{user.payment}</td> {/* Updated payment method display */}
                <td className="text-user">{user.time}</td>
                <td className="text-user">{user.date}</td>
                <td className={`status ${user.status}`}>
                  <div className={`status-background-${user.status}`}>
                    {user.statusIcon}{" "}
                    {user.status.charAt(0).toUpperCase() +
                      user.status.slice(1)}
                  </div>
                </td>
                <td
                  className="edit_users"
                  onClick={() => handleOrdersClick(user)}
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

export default UserTableRestro;
 




// import React, { useState, useEffect } from "react";
// import "./UserTableRestro.css";
// import { IoMdCheckmark } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { TbCornerUpLeft } from "react-icons/tb";
// import ReactPaginate from "react-paginate";
// import OrdersModal from "../OrdersModal/OrdersModal";
// import { UserTableOfRestaurantModalAPI } from "../../../utils/APIs/RestaurantApis/RestaurantApi"; // Import the API function
// import { toast, ToastContainer } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css";


// const UserTableRestro = () => {
//   const [userData, setUserData] = useState([]); 
//   const [loading, setLoading] = useState(false); 
//   const [currentPage, setCurrentPage] = useState(0);
//   const [usersPerPage] = useState(5);
//   const [showOrdersModal, setShowOrdersModal] = useState(false);
//   const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

//   const pageCount = Math.ceil(userData.length / usersPerPage);

 
//   const fetchUserTableData = async () => {
//     try {
//       setLoading(true);
//       const response = await UserTableOfRestaurantModalAPI();

//       setLoading(false); 
//       if (
//         response &&
//         response.data &&
//         response.data.response === true &&
//         response.data.data
//       ) {
        
//         const users = response.data.data.users; 

//         setUserData(users); 
//       } else {
//         throw new Error("Failed to fetch user data"); 
//       }
//     } catch (error) {
//       setLoading(false); 
//       toast.error("Failed to load user data. Please try again."); 
//       console.error("Error fetching user data:", error);
//     }
//   };

  
//   useEffect(() => {
//     fetchUserTableData(); 
//   }, []);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleOrdersClick = (user) => {
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

//   const indexOfLastUser = (currentPage + 1) * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

//   return (
//     <div className="p-3">
//       <ToastContainer /> 
      
//       {loading ? (
//         <p>Loading user data...</p> 
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-user">
//             <thead className="heading_user">
//               <tr>
//                 <th scope="col">Sr No.</th>
//                 <th scope="col">User Name</th>
//                 <th scope="col">Payment Method</th>
//                 <th scope="col">Time</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Payment</th>
//                 <th scope="col">Orders</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.length > 0 ? (
//                 currentUsers.map((user, index) => (
//                   <tr key={user.id}>
//                     <th scope="row" className="id-user">
//                       {indexOfFirstUser + index + 1}
//                     </th>
//                     <td>
//                       <div className="container container-user">
//                         <div className="pic-email-user">
//                           <div className="col-6 col-md-2">
//                             <img
//                               className="img-user"
//                               src={user.image}
//                               alt={user.name}
//                             />
//                           </div>
//                           <div className="col-6 col-md-4">
//                             <div className="row name-email-user">
//                               <div className="name-user">{user.name}</div>
//                               <div className="email-user">{user.email}</div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-user">{user.payment}</td>
//                     <td className="text-user">{user.time}</td>
//                     <td className="text-user">{user.date}</td>
//                     <td className={`status ${user.status}`}>
//                       <div className={`status-background-${user.status}`}>
//                         {user.statusIcon}{" "}
//                         {user.status.charAt(0).toUpperCase() +
//                           user.status.slice(1)}
//                       </div>
//                     </td>
//                     <td
//                       className="edit_users"
//                       onClick={() => handleOrdersClick(user)}
//                     >
//                       Orders
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">No users found.</td>
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

// export default UserTableRestro;
