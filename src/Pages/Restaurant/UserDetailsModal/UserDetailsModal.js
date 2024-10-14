import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./UserDetailsModal.css"; // Ensure this file includes the CSS for width
import UserTableRestro from "../UserTableRestro/UserTableRestro";
import { EditRestaurantStatusinAPI } from "../../../utils/APIs/RestaurantApis/RestaurantApi";
import { toast } from "react-toastify";
import axios from "axios";

const COMMISION_REVENUE = 50;
const CARD_REVENUE = 20;
const CASH_REVENUE = 20;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear(); // Get the current year
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // Create array from 5 years before to 5 years after

const UserDetailsModal = ({ show, handleClose, restaurant, setRestaurant,handleSubmit }) => {
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false); // Close the dropdown after selection
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false); // Close the dropdown after selection
  };

  const [loading, setLoading] = useState(false);

  
  const handleCommissionChange = (e) => {
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setRestaurant({ ...restaurant, commission: value });
    }
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); 

    try {
      const response = await axios.put()({
        status: restaurant.status,
        commission: restaurant.commission,
      });

      setLoading(false); 

      if (response?.data?.response === true) {
        toast.success("Restaurant updated successfully!"); 
        handleSubmit(); 
        handleClose(); 
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update restaurant. Please try again."); 
      console.error("Failed to update restaurant", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="UserTableModal">
      <Modal.Header className="UserDetailsModar-header">
        <Modal.Title>Restaurant Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="RestaurantDetails-UserDetailsModal">
          <div className="col-12 col-md-6">
            <h6>Name: {restaurant.name}</h6>
            <p>Email: {restaurant.email}</p>
            {/* <p>Phone: {restaurant.phone}</p> */}
            <p>Signup Date: {restaurant.date}</p>
            {/* <p>
              Status: {restaurant.status === "confirmed" ? "Approved" : "Unapproved"}
            </p> */}

            <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="restaurantStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={restaurant.status}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, status: e.target.value })
                }
              >
                <option value="Activated">Approved</option>
                <option value="Deactivated">Unapproved</option>
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

           <div className="mt-3 d-flex align-items-center flex-row-reverse">
                <div className="ml-3">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleFormSubmit}
                    disabled={loading} 
                    className="btn-saveChanges-user"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
               
                <div>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="btn-cancel-user"
                  >
                    Cancel
                </Button>
                </div>
                  

           </div>

          
          </div>

          <div className="col-12 col-md-6">
            {/* Custom Dropdown for Month */}
            <Form.Group controlId="formMonth">
              <Form.Label>Month</Form.Label>
              <div className="custom-dropdown" onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}>
                <input type="text" value={selectedMonth} readOnly />
                {isMonthDropdownOpen && (
                  <div className="dropdown-menu-month">
                    {months.map((month, index) => (
                      <div key={index} className="dropdown-item" onClick={() => handleMonthSelect(month)}>
                        {month}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

            {/* Custom Dropdown for Year */}
            <Form.Group controlId="formYear" className="mt-3">
              <Form.Label>Year</Form.Label>
              <div className="custom-dropdown" onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}>
                <input type="text" value={selectedYear} readOnly />
                {isYearDropdownOpen && (
                  <div className="dropdown-menu-year">
                    {years.map((year, index) => (
                      <div key={index} className="dropdown-item" onClick={() => handleYearSelect(year)}>
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

            <h6 className="mt-3">Monthly Revenue</h6>
            <p>Commission Revenue: {COMMISION_REVENUE}%</p>
            <p>Card Revenue: {CARD_REVENUE}$</p>
            <p>Cash Revenue: {CASH_REVENUE}$</p>
          </div>
        </div>

        <UserTableRestro />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
 


// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { toast } from "react-toastify"; 
// import "./UserDetailsModal.css"; 
// import UserTableRestro from "../UserTableRestro/UserTableRestro";
// import { DisplayRestaurantDetailsModalAPI } from "../../../utils/APIs/RestaurantApis/RestaurantApi"; 
// import Loader from "../../Loader/Loader";
// import axios from "axios";
// const COMMISION_REVENUE = 50;
// const CARD_REVENUE = 20;
// const CASH_REVENUE = 20;

// const months = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const currentYear = new Date().getFullYear(); 
// const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); 

// const UserDetailsModal = ({ show, handleClose, restaurant,restaurantId }) => {
//   const [selectedMonth, setSelectedMonth] = useState("Select Month");
//   const [selectedYear, setSelectedYear] = useState("Select Year");
//   const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
//   const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(false); 
//   const [restaurantDetails, setRestaurantDetails] = useState(null); 


//   console.log("bhagya Resto ID",restaurantId)
//   const handleMonthSelect = (month) => {
//     setSelectedMonth(month);
//     setIsMonthDropdownOpen(false);
//   };

//   const handleYearSelect = (year) => {
//     setSelectedYear(year);
//     setIsYearDropdownOpen(false); 
//   };

//   const fetchRestaurantDetails = async () => {
//     try {
//       setLoading(true);
//       // const response = await DisplayRestaurantDetailsModalAPI();
//       const response = await axios.get("https://dineright.techfluxsolutions.com/api/app/getUsersbyID")
//       setLoading(false);

//       console.log("editRestro",response)
//       if (
//         response &&
//         response.data &&
//         response.data.response &&
//         response.data.response.response === true
//       ) {
//         setRestaurantDetails(response.data.response.data);
//       } else {
//         throw new Error("Failed to fetch restaurant details.");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message || "Error fetching restaurant details"); 
//     }
//   };

//   useEffect(() => {
//     if (show) { 
//       fetchRestaurantDetails();
//     }
//   }, [show]);

//   if(loading){
//     return <Loader/>
//   }

//   return (
//     <Modal show={show} onHide={handleClose} centered className="UserTableModal">
//       <Modal.Header className="UserDetailsModar-header">
//         <Modal.Title>Restaurant Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="RestaurantDetails-UserDetailsModal">
//           <div className="col-12 col-md-6">
//             <h6>Name: {restaurantDetails ? restaurantDetails.name : "NA"}</h6>
//             <p>Email: {restaurantDetails ? restaurantDetails.email : "NA"}</p>
//             <p>Phone: {restaurantDetails ? restaurantDetails.phone : "NA"}</p>
//             <p>Signup Date: {restaurantDetails ? restaurantDetails.date : "NA"}</p>
//             <p>
//               Status: {restaurantDetails ? (restaurantDetails.status === "confirmed" ? "Approved" : "Unapproved") : "Loading..."}
//             </p>
//           </div>

//           <div className="col-12 col-md-6">
//             {/* Custom Dropdown for Month */}
//             <Form.Group controlId="formMonth">
//               <Form.Label>Month</Form.Label>
//               <div className="custom-dropdown" onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}>
//                 <input type="text" value={selectedMonth} readOnly />
//                 {isMonthDropdownOpen && (
//                   <div className="dropdown-menu-month">
//                     {months.map((month, index) => (
//                       <div key={index} className="dropdown-item" onClick={() => handleMonthSelect(month)}>
//                         {month}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </Form.Group>

//             {/* Custom Dropdown for Year */}
//             <Form.Group controlId="formYear" className="mt-3">
//               <Form.Label>Year</Form.Label>
//               <div className="custom-dropdown" onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}>
//                 <input type="text" value={selectedYear} readOnly />
//                 {isYearDropdownOpen && (
//                   <div className="dropdown-menu-year">
//                     {years.map((year, index) => (
//                       <div key={index} className="dropdown-item" onClick={() => handleYearSelect(year)}>
//                         {year}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </Form.Group>

//             <h6 className="mt-3">Monthly Revenue</h6>
//             <p>Commission Revenue: {COMMISION_REVENUE}%</p>
//             <p>Card Revenue: {CARD_REVENUE}$</p>
//             <p>Cash Revenue: {CASH_REVENUE}$</p>
//           </div>
//         </div>

//         <UserTableRestro />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default UserDetailsModal;
