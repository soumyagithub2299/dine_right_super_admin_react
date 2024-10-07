import React, { useState } from "react";
import "./CommissionTable.css";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import ReactPaginate from "react-paginate";
import EditCommissionModal from "../EditCommissionModal/EditCommissionModal";

const CommissionTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [commissionsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [commissions, setCommissions] = useState([
    {
      id: 1,
      name: "Garlic Hotel",
      phone: "123456789",
      commission: 15,
      monthlyRevenuePercentage: 20,
      paymentMethod: "Cash",
      status: "unapproved",
    },
    {
      id: 2,
      name: "Five Elements",
      phone: "923456781",
      commission: 20,
      monthlyRevenuePercentage: 25, 
      paymentMethod: "Card",
      status: "unapproved",
    },
    {
      id: 3,
      name: "RiverDine",
      phone: "823456789",
      commission: 25,
      monthlyRevenuePercentage: 30, 
      paymentMethod: "Card",
      status: "approved",
    },
    {
      id: 4,
      name: "Garlic Hotel",
      phone: "123456789",
      commission: 15,
      monthlyRevenuePercentage: 20,
      paymentMethod: "Cash",
      status: "unapproved",
    },
    {
      id: 5,
      name: "Five Elements",
      phone: "923456781",
      commission: 20,
      monthlyRevenuePercentage: 25, 
      paymentMethod: "Card",
      status: "unapproved",
    },
    {
      id: 6,
      name: "RiverDine",
      phone: "823456789",
      commission: 25,
      monthlyRevenuePercentage: 30, 
      paymentMethod: "Cash",
      status: "approved",
    },
  ]);

  const pageCount = Math.ceil(commissions.length / commissionsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (commission) => {
    setSelectedCommission(commission);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCommission(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setCommissions(
      commissions.map((commission) =>
        commission.id === selectedCommission.id ? selectedCommission : commission
      )
    );
    handleCloseModal(); 
  };

  return (
    <div className="Restro-Table-Main p-3">
      <div className="table-responsive mb-5">
        <table className="table table-bordered table-guest">
          <thead className="heading_guest">
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Restaurant Name</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">% Commission</th>
              <th scope="col">Monthly Revenue</th> 
              <th scope="col">Payment Method</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {commissions
              .slice(
                currentPage * commissionsPerPage,
                (currentPage + 1) * commissionsPerPage
              )
              .map((commission, index) => (
                <tr key={commission.id}>
                  <th scope="row" className="id-guest">
                    {index + 1}
                  </th>
                  <td className="text-guest">{commission.name}</td>
                  <td className="text-guest">{commission.phone}</td>
                  <td className="text-guest">{commission.commission}</td>
                  <td className="text-guest">{commission.monthlyRevenuePercentage}</td> {/* Updated to remove percentage sign */}
                  <td className="text-guest">{commission.paymentMethod}</td>
                  <td
                    className={`status ${
                      commission.status === "approved" ? "confirmed" : "cancelled"
                    }`}
                  >
                    <div
                      className={`status-background-${
                        commission.status === "approved" ? "confirmed" : "cancelled"
                      }`}
                    >
                      {commission.status === "approved" ? (
                        <IoMdCheckmark />
                      ) : (
                        <RxCross2 />
                      )}
                      {commission.status === "approved" ? "Paid" : "Unpaid"}
                    </div>
                  </td>

                  <td
                    className="edit_guests"
                    onClick={() => handleEditClick({ ...commission })}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan="8" className="pagination-row">
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

      {showModal && (
        <EditCommissionModal
          show={showModal}
          handleClose={handleCloseModal}
          restaurant={selectedCommission}
          setRestaurant={setSelectedCommission}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CommissionTable;




 
// import React, { useState, useEffect } from "react";
// import "./CommissionTable.css";
// import { IoMdCheckmark } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import ReactPaginate from "react-paginate";
// import EditCommissionModal from "../EditCommissionModal/EditCommissionModal";
// import { CommissionTableAPI } from "./.././../../utils/APIs/CommissionApis/CommissionApi"; 
// import { toast } from "react-toastify";

// const CommissionTable = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [commissionsPerPage] = useState(10);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCommission, setSelectedCommission] = useState(null);
//   const [commissions, setCommissions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Function to fetch commission data
//   const getCommissionData = async () => {
//     try {
//       setLoading(true);
//       const response = await CommissionTableAPI(); // API call
//       setLoading(false);
//       if (response && response?.data?.commissions) {
//         setCommissions(response?.data?.commissions);
//       } else {
//         toast.error("Error fetching commission data");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("API error occurred. Please try again.");
//     }
//   };

//   useEffect(() => {
//     getCommissionData();
//   }, []);

//   const pageCount = Math.ceil(commissions.length / commissionsPerPage);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleEditClick = (commission) => {
//     setSelectedCommission(commission);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedCommission(null);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setCommissions(
//       commissions.map((commission) =>
//         commission.id === selectedCommission.id ? selectedCommission : commission
//       )
//     );
//     handleCloseModal();
//   };

//   return (
//     <div className="Restro-Table-Main p-3">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="table-responsive mb-5">
//             <table className="table table-bordered table-guest">
//               <thead className="heading_guest">
//                 <tr>
//                   <th scope="col">Sr No.</th>
//                   <th scope="col">Restaurant Name</th>
//                   <th scope="col">Mobile No.</th>
//                   <th scope="col">% Commission</th>
//                   <th scope="col">Monthly Revenue</th>
//                   <th scope="col">Payment Method</th>
//                   <th scope="col">Status</th>
//                   <th scope="col"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {commissions
//                   .slice(
//                     currentPage * commissionsPerPage,
//                     (currentPage + 1) * commissionsPerPage
//                   )
//                   .map((commission, index) => (
//                     <tr key={commission.id}>
//                       <th scope="row" className="id-guest">
//                         {index + 1}
//                       </th>
//                       <td className="text-guest">{commission.name}</td>
//                       <td className="text-guest">{commission.phone}</td>
//                       <td className="text-guest">{commission.commission}</td>
//                       <td className="text-guest">
//                         {commission.monthlyRevenuePercentage}
//                       </td>
//                       <td className="text-guest">{commission.paymentMethod}</td>
//                       <td
//                         className={`status ${
//                           commission.status === "approved"
//                             ? "confirmed"
//                             : "cancelled"
//                         }`}
//                       >
//                         <div
//                           className={`status-background-${
//                             commission.status === "approved"
//                               ? "confirmed"
//                               : "cancelled"
//                           }`}
//                         >
//                           {commission.status === "approved" ? (
//                             <IoMdCheckmark />
//                           ) : (
//                             <RxCross2 />
//                           )}
//                           {commission.status === "approved" ? "Paid" : "Unpaid"}
//                         </div>
//                       </td>

//                       <td
//                         className="edit_guests"
//                         onClick={() => handleEditClick({ ...commission })}
//                       >
//                         Edit
//                       </td>
//                     </tr>
//                   ))}
//                 <tr>
//                   <td colSpan="8" className="pagination-row">
//                     <ReactPaginate
//                       previousLabel={"Previous"}
//                       nextLabel={"Next"}
//                       breakLabel={"..."}
//                       pageCount={pageCount}
//                       marginPagesDisplayed={2}
//                       pageRangeDisplayed={3}
//                       onPageChange={handlePageClick}
//                       containerClassName={"pagination justify-content-center"}
//                       pageClassName={"page-item"}
//                       pageLinkClassName={"page-link"}
//                       previousClassName={"page-item"}
//                       previousLinkClassName={"page-link"}
//                       nextClassName={"page-item"}
//                       nextLinkClassName={"page-link"}
//                       breakClassName={"page-item"}
//                       breakLinkClassName={"page-link"}
//                       activeClassName={"active"}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {showModal && (
//             <EditCommissionModal
//               show={showModal}
//               handleClose={handleCloseModal}
//               restaurant={selectedCommission}
//               setRestaurant={setSelectedCommission}
//               handleSubmit={handleSubmit}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default CommissionTable;





