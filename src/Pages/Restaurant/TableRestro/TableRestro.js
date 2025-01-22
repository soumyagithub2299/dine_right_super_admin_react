import React, { useState, useEffect } from "react";
import "./TableRestro.css";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Loader from "../../Loader/Loader";
import UserDetailsModal from "../UserDetailsModal/UserDetailsModal";
import DescriptionIcon from "@mui/icons-material/Description";
import { AiOutlineClose } from "react-icons/ai"; // Importing icon from react-icons

const TableRestro = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurantsPerPage] = useState(10); // Number of rows per page
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
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/getGuests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response?.data?.response === true) {
        const data = response?.data?.users || [];
        setRestaurants(data);
      } else {
        toast.error(response.data.error_msg || "Please try again.");
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

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedRestaurant(null);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="d-flex justify-content-between align-items-center mb-3" style={{float:"right"}}>
       
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by restaurant name"
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
            <table className="table table-bordered table-user">
              <thead className="heading_user">
                <tr>
                  <th scope="col" style={{ width: "5%" }}>
                    Sr No.
                  </th>
                  <th scope="col" style={{ width: "17%" }}>
                    Restaurant Name
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Owner Name
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Phone
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Mail ID
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    City
                  </th>
                  <th scope="col" style={{ width: "13%" }}>
                    Signup
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    %
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRestaurants.length > 0 ? (
                  currentRestaurants.map((restaurant, index) => (
                    <tr key={restaurant.id}>
                      <th scope="row" className="id-user">
                        {offset + index + 1}
                      </th>
                      <td className="text-user">{restaurant.restaurantName}</td>
                      <td className="text-user">{restaurant.username}</td>
                      <td className="text-user">{restaurant.phone}</td>
                      <td className="text-user">{restaurant.email}</td>
                      <td className="text-user">{restaurant.city_name}</td>
                      <td className="text-user">
                        {new Date(restaurant.created_at)
                          .toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .replace(",", "")}
                      </td>
                      <td className="text-user">
                        {restaurant.commission ? (
                          restaurant.commission
                        ) : (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            TBA
                          </span>
                        )}
                      </td>
                      <td className={`status ${restaurant.status}`}>
                        <div
                          className={`status-background-${restaurant.status}`}
                        >
                          {restaurant.status === "Activated"
                            ? "Approved"
                            : "Unapproved"}
                        </div>
                      </td>
                      <td
                        className="edit_users"
                        onClick={() => handleRestaurantClick(restaurant)}
                      >
                        <DescriptionIcon style={{ cursor: "pointer" }} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
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
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}

      {showDetailsModal && (
        <UserDetailsModal
          show={showDetailsModal}
          handleClose={handleCloseDetailsModal}
          restaurantDetails={selectedRestaurant}
          getRestaurantTableData={getRestaurantTableData}
        />
      )}
    </div>
  );
};

export default TableRestro;
