import React, { useState, useEffect } from "react";
import "./CommissionTable.css";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Loader/Loader";
import EditRestroModal from "./EditRestroModal/EditRestroModal";
import EditIcon from "@mui/icons-material/Edit";

const CommissionTable = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const getRestaurantTableData = async () => {
    try {
      const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/getDeactivatedRestaurants`,
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
          <table
            style={{ cursor: "default" }}
            className="table table-bordered table-user"
          >
            <thead style={{ cursor: "default" }} className="heading_user">
              <tr style={{ cursor: "default" }}>
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
            <tbody style={{ cursor: "default" }}>
              {restaurants.map((restaurant, index) => (
                <tr style={{ cursor: "default" }} key={restaurant.id}>
                  <th scope="row" className="id-user">
                    {index + 1}
                  </th>
                  <td className="text-user">{restaurant.restaurantName}</td>
                  <td className="text-user">{restaurant.username}</td>
                  <td className="text-user">{restaurant.phone}</td>
                  <td className="text-user">{restaurant.email}</td>
                  <td className="text-user">{restaurant.city_name}</td>
                  <td className="text-user">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })
                      .format(new Date(restaurant.created_at))
                      .replace(",", "")}
                  </td>
                  <td className="text-user">
                    {restaurant.commission ? (
                      restaurant.commission
                    ) : (
                      <span style={{ color: "red", fontWeight: "bold" }}>TBA</span>
                    )}
                  </td>
                  <td className={`status ${restaurant.status}`}>
                    <div className={`status-background-${restaurant.status}`}>
                      {restaurant.status === "Activated"
                        ? "Approved"
                        : "Unapproved"}
                    </div>
                  </td>
                  <td
                    className="edit_users"
                    onClick={() => handleRestaurantClick(restaurant)}
                  >
                    <EditIcon style={{ cursor: "pointer" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDetailsModal && (
        <EditRestroModal
          show={showDetailsModal}
          handleClose={handleCloseDetailsModal}
          restaurantDetails={selectedRestaurant}
          getRestaurantTableData={getRestaurantTableData}
        />
      )}
    </div>
  );
};

export default CommissionTable;
