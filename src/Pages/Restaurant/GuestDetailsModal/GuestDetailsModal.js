import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./GuestDetailsModal.css"; // Ensure this file includes the CSS for width
import GuestTableRestro from "../GuestTableRestro/GuestTableRestro";

const COMMISION_REVENUE = 50;
const CARD_REVENUE = 20;
const CASH_REVENUE = 20;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear(); // Get the current year
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // Create array from 5 years before to 5 years after

const GuestDetailsModal = ({ show, handleClose, restaurant }) => {
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

  return (
    <Modal show={show} onHide={handleClose} centered className="GuestTableModal">
      <Modal.Header className="GuestDetailsModar-header">
        <Modal.Title>Restaurant Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="RestaurantDetails-GuestDetailsModal">
          <div className="col-12 col-md-6">
            <h6>Name: {restaurant.name}</h6>
            <p>Email: {restaurant.email}</p>
            <p>Phone: {restaurant.phone}</p>
            <p>Signup Date: {restaurant.date}</p>
            <p>
              Status: {restaurant.status === "confirmed" ? "Approved" : "Unapproved"}
            </p>
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

        <GuestTableRestro />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuestDetailsModal;
 


// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { toast } from "react-toastify"; 
// import "./GuestDetailsModal.css"; 
// import GuestTableRestro from "../GuestTableRestro/GuestTableRestro";
// import { DisplayRestaurantDetailsModalAPI } from "../../../utils/APIs/RestaurantApis/RestaurantApi"; 
// const COMMISION_REVENUE = 50;
// const CARD_REVENUE = 20;
// const CASH_REVENUE = 20;

// const months = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const currentYear = new Date().getFullYear(); 
// const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); 

// const GuestDetailsModal = ({ show, handleClose, restaurant }) => {
//   const [selectedMonth, setSelectedMonth] = useState("Select Month");
//   const [selectedYear, setSelectedYear] = useState("Select Year");
//   const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
//   const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(false); 
//   const [restaurantDetails, setRestaurantDetails] = useState(null); 

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
//       const response = await DisplayRestaurantDetailsModalAPI();
//       setLoading(false);
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

//   return (
//     <Modal show={show} onHide={handleClose} centered className="GuestTableModal">
//       <Modal.Header className="GuestDetailsModar-header">
//         <Modal.Title>Restaurant Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="RestaurantDetails-GuestDetailsModal">
//           <div className="col-12 col-md-6">
//             <h6>Name: {restaurantDetails ? restaurantDetails.name : "Loading..."}</h6>
//             <p>Email: {restaurantDetails ? restaurantDetails.email : "Loading..."}</p>
//             <p>Phone: {restaurantDetails ? restaurantDetails.phone : "Loading..."}</p>
//             <p>Signup Date: {restaurantDetails ? restaurantDetails.date : "Loading..."}</p>
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

//         <GuestTableRestro />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default GuestDetailsModal;
