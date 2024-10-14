// import React, { useState } from 'react';
// import './TableUser.css';
// import { IoMdCheckmark } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { TbCornerUpLeft } from "react-icons/tb";
// import EditUserModal from '../EditUserModal/EditUserModal';
// import ReactPaginate from 'react-paginate';
// import OrdersModal from '../OrdersModal/OrdersModal';

// const initialUserData = [
//   {
//     id: 1,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '123456789',
//     time: '21:00-22:00',
//     date: 'Jan 6, 2022',
//     status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 4,
//     table: 'T1',
//   },
//   {
//     id: 2,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-2.jpg',
//     mobile: '923456781',
//     time: '10:00-22:00',
//     date: 'Jan 7, 2022',
//     status: 'cancelled',
//     statusIcon: <RxCross2 />,
//     people: 2,
//     table: 'TM2',
//   },
//   {
//     id: 3,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//     status: 'refund',
//     statusIcon: <TbCornerUpLeft />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 4,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//     status: 'refund',
//     statusIcon: <TbCornerUpLeft />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 5,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//     status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 6,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//    status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 7,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//     status: 'refund',
//     statusIcon: <TbCornerUpLeft />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 8,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//    status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 9,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//    status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 10,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//     status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 11,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//     status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 6,
//     table: 'To3',
//   },
//   {
//     id: 12,
//     name: 'Olivia Rhye',
//     email: 'olivia@untitledui.com',
//     image: './assets/images/Users/user-img-1.jpg',
//     mobile: '823456789',
//     time: '9:00-22:00',
//     date: 'Jan 8, 2022',
//     status: 'confirmed',
//     statusIcon: <IoMdCheckmark />,
//     people: 6,
//     table: 'To3',
//   },
// ];

// const TableUser = () => {
//   const [userData, setUserData] = useState(initialUserData);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [usersPerPage] = useState(10); // Number of users per page (set to 10)
//   const [showModal, setShowModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const [showOrdersModal, setShowOrdersModal] = useState(false); // For Orders Modal
//   const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // Order Details

//   const pageCount = Math.ceil(userData.length / usersPerPage);

//   // Function to handle page change
//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'confirmed':
//         return <IoMdCheckmark />;
//       case 'cancelled':
//         return <RxCross2 />;
//       case 'refund':
//         return <TbCornerUpLeft />;
//       default:
//         return null;
//     }
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedUser(null);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const updatedUser = {
//       ...selectedUser,
//       statusIcon: getStatusIcon(selectedUser.status),
//     };
//     const updatedUserData = userData.map((user) =>
//       user.id === updatedUser.id ? updatedUser : user
//     );
//     setUserData(updatedUserData);
//     handleCloseModal();
//   };

//   const handleOrdersClick = (user) => {
//     // Set order details dynamically (sample data here)
//     const orderDetails = {
//       items: ['Spinach Salad', 'Red Sauce Pasta', 'Margarita Pizza'],
//       comment: 'Birthday Celebration'
//     };
//     setSelectedOrderDetails(orderDetails);
//     setShowOrdersModal(true);
//   };

//   const handleCloseOrdersModal = () => {
//     setShowOrdersModal(false);
//     setSelectedOrderDetails(null);
//   };

//   // Logic for displaying the current users on the page
//   const indexOfLastUser = (currentPage + 1) * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

//   return (
//     <div className='p-3'>
//       <div className="table-responsive mb-5">
//         <table className="table table-bordered table-user">
//           <thead className='heading_user'>
//             <tr>
//               <th scope="col">Sr No.</th>
//               <th scope="col">User Name</th>
//               <th scope="col">Mobile No.</th>
//               <th scope="col">Time</th>
//               <th scope="col">Date</th>
//               <th scope="col">Status</th>
//               <th scope="col">People</th>
//               <th scope="col">Table</th>
//               {/* <th scope="col">Edit</th> Commented out Edit column */}
//               <th scope="col">Orders</th> {/* New Orders column */}
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map((user, index) => (
//               <tr key={user.id}>
//                 <th scope="row" className='id-user'>{indexOfFirstUser + index + 1}</th>
//                 <td>
//                   <div className='container container-user'>
//                     <div className='pic-email-user'>
//                       <div className='col-6 col-md-2'>
//                         <img className='img-user' src={user.image} alt={user.name} />
//                       </div>
//                       <div className='col-6 col-md-4'>
//                         <div className='row name-email-user'>
//                           <div className='name-user'>{user.name}</div>
//                           <div className='email-user'>{user.email}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className='text-user'>{user.mobile}</td>
//                 <td className='text-user'>{user.time}</td>
//                 <td className='text-user'>{user.date}</td>
//                 <td className={`status ${user.status}`}>
//                   <div className={`status-background-${user.status}`}>
//                     {user.statusIcon} {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
//                   </div>
//                 </td>
//                 <td className='text-user'>{user.people}</td>
//                 <td className='text-user'>{user.table}</td>
//                 {/* <td className='edit_users' onClick={() => handleEditClick(user)}>Edit</td> Commented out Edit link */}
//                 <td className='edit_users' onClick={() => handleOrdersClick(user)}>Orders</td> {/* New Orders link */}
//               </tr>
//             ))}

//             {/* Pagination row */}
//             <tr>
//               <td colSpan="10" className='pagination-row'>
//                 <ReactPaginate
//                   previousLabel={'Previous'}
//                   nextLabel={'Next'}
//                   breakLabel={'...'}
//                   pageCount={pageCount}
//                   marginPagesDisplayed={2}
//                   pageRangeDisplayed={3}
//                   onPageChange={handlePageClick}
//                   containerClassName={'pagination justify-content-center'}
//                   pageClassName={'page-item'}
//                   pageLinkClassName={'page-link'}
//                   previousClassName={'page-item'}
//                   previousLinkClassName={'page-link'}
//                   nextClassName={'page-item'}
//                   nextLinkClassName={'page-link'}
//                   breakClassName={'page-item'}
//                   breakLinkClassName={'page-link'}
//                   activeClassName={'active'}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {selectedUser && (
//         <EditUserModal
//           show={showModal}
//           handleClose={handleCloseModal}
//           user={selectedUser}
//           setUser={setSelectedUser}
//           handleSubmit={handleSubmit}
//         />
//       )}

//       {selectedOrderDetails && (
//         <OrdersModal
//           show={showOrdersModal}
//           handleClose={handleCloseOrdersModal}
//           orderDetails={selectedOrderDetails} // Pass the order details
//         />
//       )}
//     </div>
//   );
// };

// export default TableUser;





import React, { useState, useEffect } from "react";
import "./TableUser.css";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbCornerUpLeft } from "react-icons/tb";
import EditUserModal from "../EditUserModal/EditUserModal";
import ReactPaginate from "react-paginate";
import OrdersModal from "../OrdersModal/OrdersModal";
import { UserTableAPI } from "./../../../utils/APIs/UsersApis/UsersApi";
import { toast } from "react-toastify"; 
import axios from "axios";
import Loader from "../../Loader/Loader"

const TableUser = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10); 
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [showOrdersModal, setShowOrdersModal] = useState(false); 
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // const pageCount = Math.ceil(userData.length / usersPerPage);
  const pageCount = Math.ceil((userData?.length || 0) / usersPerPage);

  // const getUserTableData = async () => {
  //   try {
  //     setLoading(true);
  //     // const response = await UserTableAPI();
  //     const response = await axios.get ("https://dineright.techfluxsolutions.com/api/app/customers"); // Call the login API
  //     console.log(response.data)
  //     setLoading(false);

  //     if (response && response?.data) {
  //       const users = response?.data
  //       setUserData(users); 
  //     } else {
  //       toast.error("Failed to load user data. Please try again.");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching user data:", error);
  //     toast.error("Error occurred while fetching user data.");
  //   }
  // };

  // Fetch data on component mount
  const token = sessionStorage.getItem("superAdminTokenDineRight");
  const getUserTableData = async () => {
    try {
      setLoading(true);
      
      // Call the API with token authentication in headers
      const response = await axios.get(
        "https://dineright.techfluxsolutions.com/api/app/customers",
        {
          headers: {
            Authorization: `Bearer ${token}` // Attach the token to the Authorization header
          }
        }
      );

      setLoading(false);

      if (response && response?.data) {
        const users = response?.data;
        setUserData(users); 
      } else {
        toast.error("Failed to load user data. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
      toast.error("Error occurred while fetching user data.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getUserTableData();
  }, []);
  useEffect(() => {
    getUserTableData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <IoMdCheckmark />;
      case "cancelled":
        return <RxCross2 />;
      case "refund":
        return <TbCornerUpLeft />;
      default:
        return null;
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      ...selectedUser,
      statusIcon: getStatusIcon(selectedUser.status),
    };
    const updatedUserData = userData.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUserData(updatedUserData);
    handleCloseModal();
  };

  const handleOrdersClick = (user) => {
    //Set order details dynamically (sample data here)
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
  const currentUsers = Array.isArray(userData) ? userData.slice(indexOfFirstUser, indexOfLastUser) : [];

  // const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage); 
  };

  const formatDateAndTime = (createdAt) => {
    const dateObj = new Date(createdAt);
  
    // Extract date in the desired format
    const date = dateObj.toLocaleDateString('en-GB'); // Format: "25/09/2024"
    
    // Extract time in the desired format
    const time = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }); // Format: "13:22"
  
    return { date, time };
  };

  return (
    <div className="p-3">
      {loading ? (
        <div><Loader/></div> 
      ) : (
        <div className="table-responsive mb-5">
          <table className="table table-bordered table-user">
            <thead className="heading_user">
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">User Name</th>
                {/* <th scope="col"> Email Id</th> */}
                <th scope="col">Time</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">User</th>
                <th scope="col">Table</th>
                <th scope="col">Orders</th> 
              </tr>
            </thead>
            <tbody>
                {currentUsers.map((user, index) => {
                  const { date, time } = formatDateAndTime(user.created_at); // Assuming the field is 'created_at'

                  return (
                    <tr key={user.id}>
                      <th scope="row" className="id-user">
                        {indexOfFirstUser + index + 1}
                      </th>
                      <td>
                        <div className="container container-user">
                          <div className="pic-email-user">
                            <div className="col-6 col-md-2">
                              <img className="img-user" src={user.image} alt={user.name} />
                            </div>
                            <div className="col-6 col-md-4">
                              <div className="row name-email-user">
                                <div className="name-user">{user.customer_name}</div>
                                <div className="email-user">{user.customer_email}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* <td className="text-user"></td> */}
                      <td className="text-user">{time}</td> {/* Display time */}
                      <td className="text-user">{date}</td> {/* Display date */}
                      <td className={`status ${user.status || ''}`}>
                        <div className={`status-background-${user.status || 'default'}`}>
                          {user.statusIcon}{" "}
                          {user.status
                            ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
                            : 'Unknown'}
                        </div>
                      </td>
                      <td className="text-user">{user.people}</td>
                      <td className="text-user">{user.table}</td>
                      <td
                        className="edit_users"
                        onClick={() => handleOrdersClick(user)}
                      >
                        Orders
                      </td>
                    </tr>
                  );
                })}
              </tbody>

          </table>
        </div>
      )}

      {selectedUser && (
        <EditUserModal
          show={showModal}
          handleClose={handleCloseModal}
          user={selectedUser}
          setUser={setSelectedUser}
          handleSubmit={handleSubmit}
        />
      )}

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

export default TableUser;

