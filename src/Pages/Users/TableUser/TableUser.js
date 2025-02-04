import React, { useState, useEffect } from "react";
import "./TableUser.css";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Loader/Loader";
import OrdersModal from "../OrdersModal/OrdersModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AiOutlineClose } from "react-icons/ai"; // Importing icon from react-icons

const TableUser = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurantsPerPage] = useState(10);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const getRestaurantTableData = async () => {
    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      if (response?.data?.response === true) {
        const data = response?.data?.customers || [];
        setRestaurants(data);
      } else {
        toast.error(response.data.error_msg || "Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      toast.error("Failed to load restaurant data. Please try again.");
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getRestaurantTableData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedRestaurant(null);
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const offset = currentPage * restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    offset,
    offset + restaurantsPerPage
  );
  const pageCount = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

  return (
    <div className="Restro-Table-Main p-3">
      <div className="d-flex justify-content-between align-items-center mb-3"  style={{float:"right"}}>
       
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by user name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
          {searchQuery && (
            <AiOutlineClose
              className="clear-icon"
              onClick={handleClearSearch}
            />
          )}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="table-responsive mb-5">
            <table
              style={{ cursor: "default" }}
              className="table table-bordered table-user"
            >
              <thead style={{ cursor: "default" }} className="heading_user">
                <tr style={{ cursor: "default" }}>
                  <th scope="col" style={{ width: "10%" }}>
                    Sr No.
                  </th>
                  <th scope="col" style={{ width: "30%" }}>
                    User Name
                  </th>
                  <th scope="col" style={{ width: "30%" }}>
                    User Mail ID
                  </th>
                  <th scope="col" style={{ width: "25%" }}>
                    Signup Date
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ cursor: "default" }}>
                {currentRestaurants.length > 0 ? (
                  currentRestaurants.map((restaurant, index) => (
                    <tr
                      style={{ cursor: "default" }}
                      key={restaurant.customer_id}
                    >
                      <th scope="row" className="id-user">
                        {offset + index + 1}
                      </th>
                      <td className="text-user">{restaurant.customer_name}</td>
                      <td className="text-user">{restaurant.customer_email}</td>
                      <td className="text-user">
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })
                          .format(new Date(restaurant.created_at))
                          .replace(",", "")}
                      </td>

                      <td
                        className="edit_users"
                        onClick={() => handleRestaurantClick(restaurant)}
                      >
                        <VisibilityIcon style={{ cursor: "pointer" }} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
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

      {showDetailsModal && (
        <OrdersModal
          show={showDetailsModal}
          handleClose={handleCloseDetailsModal}
          selectedRestaurant={selectedRestaurant}
        />
      )}
    </div>
  );
};

export default TableUser;
