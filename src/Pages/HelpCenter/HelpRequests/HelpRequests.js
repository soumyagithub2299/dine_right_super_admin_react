import React, { useState, useEffect } from "react";
import "./HelpRequests.css";
import ReactPaginate from "react-paginate";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";

const HelpRequests = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [requestsPerPage] = useState(10); // Number of rows per page
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy data to simulate API response
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1-123-456-7890",
      restaurant: "DineRight Café",
      message: "Looking for assistance with menu setup.",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1-987-654-3210",
      restaurant: "Smith's Bistro",
      message: "Need help with order management.",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1-555-666-7777",
      restaurant: "Bob's Diner",
      message: "Requesting a demo of the software.",
    },
    // Add more dummy data as needed
  ];

  const getHelpRequestsData = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setRequests(dummyData); // Simulate API response
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching help request data:", error);
      toast.error("Failed to load help request data. Please try again.");
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getHelpRequestsData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Pagination logic
  const offset = currentPage * requestsPerPage;
  const currentRequests = requests.slice(offset, offset + requestsPerPage);
  const pageCount = Math.ceil(requests.length / requestsPerPage);

  return (
    <div className="HelpRequests-Table-Main p-3">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="table-responsive mb-5">
            <table className="table table-bordered table-user">
              <thead className="heading_user">
                <tr>
                  <th scope="col" style={{ width: "10%" }}>
                    Sr No.
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Name
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Email
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Phone Number
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Restaurant Name
                  </th>
                  <th scope="col" style={{ width: "30%" }}>
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request, index) => (
                  <tr key={request.id}>
                    <th scope="row" className="id-user">
                      {offset + index + 1}
                    </th>
                    <td className="text-user">{request.name}</td>
                    <td className="text-user">{request.email}</td>
                    <td className="text-user">{request.phone}</td>
                    <td className="text-user">{request.restaurant}</td>
                    <td className="text-user">{request.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            previousClassName={"pagination-previous"}
            nextClassName={"pagination-next"}
            disabledClassName={"disabled"}
            firstLabel={"First"}
            lastLabel={"Last"}
            renderOnZeroPageCount={null}
          />
        </>
      )}
    </div>
  );
};

export default HelpRequests;
