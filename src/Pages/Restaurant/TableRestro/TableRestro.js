// import React, { useState } from "react";
// import "./TableRestro.css";
// import { IoMdCheckmark } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import ReactPaginate from "react-paginate";
// import EditRestroModal from "../EditRestroModal/EditRestroModal";
// import UserDetailsModal from "../UserDetailsModal/UserDetailsModal"; // Import the new modal

// const TableRestro = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [restaurantsPerPage] = useState(10);
//   const [showModal, setShowModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false); // State for UserDetails modal
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [restaurants, setRestaurants] = useState([
//     {
//       id: 1,
//       name: "Garlic Hotel",
//       email: "garlichotel@gmail.com",
//       phone: "123456789",
//       date: "Jan 6, 2022",
//       status: "cancelled",
//     }, // Default status is 'cancelled'
//     {
//       id: 2,
//       name: "Five Elements",
//       email: "fiveelement@gmail.com",
//       phone: "923456781",
//       date: "Jan 7, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 3,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 4,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 5,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 6,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 7,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 8,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 9,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 10,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//     {
//       id: 11,
//       name: "RiverDine",
//       email: "riverdine@gmail.com",
//       phone: "823456789",
//       date: "Jan 8, 2022",
//       status: "cancelled",
//     },
//   ]);


//   const pageCount = Math.ceil(restaurants.length / restaurantsPerPage);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleEditClick = (restaurant) => {
//     setSelectedRestaurant(restaurant);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedRestaurant(null);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setRestaurants(
//       restaurants.map((restaurant) =>
//         restaurant.id === selectedRestaurant.id ? selectedRestaurant : restaurant
//       )
//     );
//     handleCloseModal();
//   };

//   // New function to handle opening UserDetails modal
//   const handleRestaurantClick = (restaurant) => {
//     setSelectedRestaurant(restaurant);
//     setShowDetailsModal(true);
//   };

//   const handleCloseDetailsModal = () => {
//     setShowDetailsModal(false);
//     setSelectedRestaurant(null);
//   };

//   return (
//     <div className="Restro-Table-Main p-3">
//       <div className="table-responsive mb-5">
//         <table className="table table-bordered table-user">
//           <thead className="heading_user">
//             <tr>
//               <th scope="col">Sr No.</th>
//               <th scope="col">Restaurant Name</th>
//               <th scope="col">Mail</th>
//               <th scope="col">Mobile No.</th>
//               <th scope="col">Signup Date</th>
//               <th scope="col">Status</th>
//               <th scope="col"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {restaurants
//               .slice(
//                 currentPage * restaurantsPerPage,
//                 (currentPage + 1) * restaurantsPerPage
//               )
//               .map((restaurant, index) => (
//                 <tr key={restaurant.id}>
//                   <th scope="row" className="id-user">
//                     {index + 1}
//                   </th>
//                   <td 
//                     className="text-user" 
//                     onClick={() => handleRestaurantClick(restaurant)} // Added click handler
//                     style={{ cursor: "pointer"}} // Optional: add styling for clickable text
//                   >
//                     {restaurant.name}
//                   </td>
//                   <td className="text-user">{restaurant.email}</td>
//                   <td className="text-user">{restaurant.phone}</td>
//                   <td className="text-user">{restaurant.date}</td>
//                   <td className={`status ${restaurant.status}`}>
//                     <div className={`status-background-${restaurant.status}`}>
//                       {restaurant.status === "confirmed" ? (
//                         <IoMdCheckmark />
//                       ) : (
//                         <RxCross2 />
//                       )}
//                       {restaurant.status === "confirmed" ? "Approved" : "Unapproved"}
//                     </div>
//                   </td>
//                   <td
//                     className="edit_users"
//                     onClick={() => handleEditClick({ ...restaurant })}
//                   >
//                     Edit
//                   </td>
//                 </tr>
//               ))}
//             <tr>
//               <td colSpan="6" className="pagination-row">
//                 <ReactPaginate
//                   previousLabel={"Previous"}
//                   nextLabel={"Next"}
//                   breakLabel={"..."}
//                   pageCount={pageCount}
//                   marginPagesDisplayed={2}
//                   pageRangeDisplayed={3}
//                   onPageChange={handlePageClick}
//                   containerClassName={"pagination justify-content-center"}
//                   pageClassName={"page-item"}
//                   pageLinkClassName={"page-link"}
//                   previousClassName={"page-item"}
//                   previousLinkClassName={"page-link"}
//                   nextClassName={"page-item"}
//                   nextLinkClassName={"page-link"}
//                   breakClassName={"page-item"}
//                   breakLinkClassName={"page-link"}
//                   activeClassName={"active"}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <EditRestroModal
//           show={showModal}
//           handleClose={handleCloseModal}
//           restaurant={selectedRestaurant}
//           setRestaurant={setSelectedRestaurant}
//           handleSubmit={handleSubmit}
//         />
//       )}

//       {showDetailsModal && (
//         <UserDetailsModal
//           show={showDetailsModal}
//           handleClose={handleCloseDetailsModal}
//           restaurant={selectedRestaurant}
//         />
//       )}
//     </div>
//   );
// };

// export default TableRestro;
  






import React, { useState, useEffect } from "react";
import "./TableRestro.css";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import ReactPaginate from "react-paginate";
import EditRestroModal from "../EditRestroModal/EditRestroModal";
// import UserDetailsModal from "../UserDetailsModal/UserDetailsModal"; 
import { RestaurantTableAPI } from "../../../utils/APIs/RestaurantApis/RestaurantApi";
import { toast } from "react-toastify"; 
import axios from "axios";
import Loader from "../../Loader/Loader";
import UserDetailsModal from "../UserDetailsModal/UserDetailsModal";

const TableRestro = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurantsPerPage] = useState(10);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const token = sessionStorage.getItem('superAdminTokenDineRight');
  const pageCount = Math.ceil(restaurants.length / restaurantsPerPage);

  
const getRestaurantTableData = async () => {
  try {
    setLoading(true);
    const response = await axios.get('https://dineright.techfluxsolutions.com/api/app/getGuests', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Data:', response?.data?.users);
    const data = response?.data?.users || [];
    setRestaurants(data);
    setLoading(false); // Stop loader after data is successfully fetched
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    toast.error("Failed to load restaurant data. Please try again.");
    setLoading(false); // Stop loader in case of an error
  }
};

  
  // Fetch data on component mount
  useEffect(() => {
    getRestaurantTableData();
  }, []);

  // if(loading){
  //   return <Loader/>
  // }


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRestaurant(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant.id === selectedRestaurant.id ? selectedRestaurant : restaurant
      )
    );
    handleCloseModal();
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedRestaurant(null);
  };

  

  return (
    <div className="Restro-Table-Main p-3">
    {loading ? (
      <Loader />
    ) : (
        <div className="table-responsive mb-5">
          <table className="table table-bordered table-user">
            <thead className="heading_user">
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Mail</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">Signup Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {restaurants
                .slice(
                  currentPage * restaurantsPerPage,
                  (currentPage + 1) * restaurantsPerPage
                )
                .map((restaurant, index) => (
                  <tr key={restaurant.id}>
                    <th scope="row" className="id-user">
                      {index + 1}
                    </th>
                    <td 
                      className="text-user" 
                      // onClick={() => handleRestaurantClick(restaurant)}
                      // style={{ cursor: "pointer"}} 
                    >
                      {restaurant.restaurantName}
                    </td>
                    <td className="text-user">{restaurant.email}</td>
                    <td className="text-user">{restaurant.phone}</td>
                    <td className="text-user">{restaurant.date}</td>
                    <td className={`status ${restaurant.status}`}>
                      <div className={`status-background-${restaurant.status}`}>
                        {restaurant.status === "Activated" ? (
                          <IoMdCheckmark />
                        ) : (
                          <RxCross2 />
                        )}
                        {restaurant.status === "Activated" ? "Approved" : "Unapproved"}
                      </div>
                    </td>
                    <td
                      className="edit_users"
                      // onClick={() => handleEditClick({ ...restaurant })}
                      onClick={() => handleRestaurantClick(restaurant)}
                    >
                      Edit
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="6" className="pagination-row">
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
      )}

      {/* {showModal && (
        <EditRestroModal
          show={showModal}
          handleClose={handleCloseModal}
          restaurant={selectedRestaurant}
          setRestaurant={setSelectedRestaurant}
          handleSubmit={handleSubmit}
        />
      )} */}

      {showDetailsModal && (
        <UserDetailsModal
          show={showDetailsModal}
          handleClose={handleCloseDetailsModal}
          restaurant={selectedRestaurant}
          setRestaurant={setSelectedRestaurant}
          handleSubmit={handleSubmit}
          restaurantId={selectedRestaurant?.id}
        />
      )}
    </div>
  );
};

export default TableRestro;
