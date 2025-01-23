import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const token = sessionStorage.getItem("TokenForSuperAdminOfDineRight");

  const [loading, setLoading] = useState(false);
  const [TotalAPI_Data, setTotalAPI_Data] = useState(null);

  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem("isSidebarOpen");
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    const checksessionStorage = () => {
      const storedValue = sessionStorage.getItem("isSidebarOpen");
      const parsedValue = storedValue !== null ? JSON.parse(storedValue) : true;
      if (parsedValue !== value) {
        setValue(parsedValue);
      }
    };
    const intervalId = setInterval(checksessionStorage, 10);
    return () => clearInterval(intervalId);
  }, [value]);

  const handleGetAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/getAllDashboardData`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response?.data) {
        setTotalAPI_Data(response?.data?.total);
      } else {
        const errorMsg = response?.data?.error_msg || "No data available";
        toast.info(errorMsg);
        setTotalAPI_Data({});
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred, please try again.");
    }
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

  return (
    <>
      <div className={`content-container ${value ? "sidebar-open" : "sidebar-closed"}`}>
        {loading && <Loader />}

        <div className="dashboard-container">
          {/* Restaurants Section */}
          <div className="section" style={{ backgroundColor: "#e0f7fa" }}>
            <h4>Restaurants</h4>
            <div className="info-card">
              <h6>Total Restaurants</h6>
              <p>{TotalAPI_Data?.total_restaurant || 0}</p>
            </div>
            <div className="info-card">
              <h6>Activated Restaurants</h6>
              <p>{TotalAPI_Data?.total_activated_restaurant || 0}</p>
            </div>
            <div className="info-card">
              <h6>Deactivated Restaurants</h6>
              <p>{TotalAPI_Data?.total_deactivated_restaurant || 0}</p>
            </div>
            {/* <div className="info-card">
              <h6>Deleted Restaurants</h6>
              <p>{TotalAPI_Data?.total_deleted_restaurant || 0}</p>
            </div> */}
            {/* <div className="info-card">
              <h6>Uncompleted Restaurants</h6>
              <p>{TotalAPI_Data?.total_uncompleted_restaurant || 0}</p>
            </div> */}
            <div className="info-card">
              <h6>New Registered Restaurants</h6>
              <p>{TotalAPI_Data?.total_new_registered_restaurant || 0}</p>
            </div>
          </div>

          {/* Customers Section */}
          <div className="section" style={{ backgroundColor: "#fce4ec" }}>
            <h4>Customers</h4>
            <div className="info-card">
              <h6>Total Customers</h6>
              <p>{TotalAPI_Data?.total_customers || 0}</p>
            </div>
            {/* <div className="info-card">
              <h6>Deleted Customers</h6>
              <p>{TotalAPI_Data?.total_deleted_customers || 0}</p>
            </div> */}
          </div>

          {/* Bookings Section */}
          <div className="section" style={{ backgroundColor: "#f3e5f5" }}>
            <h4>Bookings</h4>
            <div className="info-card">
              <h6>Total Bookings</h6>
              <p>{TotalAPI_Data?.total_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Pending Bookings</h6>
              <p>{TotalAPI_Data?.total_pending_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Upcoming Bookings</h6>
              <p>{TotalAPI_Data?.total_upcoming_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>In-progress Bookings</h6>
              <p>{TotalAPI_Data?.total_inprogress_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Completed Bookings</h6>
              <p>{TotalAPI_Data?.total_completed_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Cancelled Bookings</h6>
              <p>{TotalAPI_Data?.total_cancelled_bookings || 0}</p>
            </div>
          </div>

          {/* <div className="section" style={{ backgroundColor: "#e3f2fd" }}>
            <h4>Payout Balance</h4>
            <div className="info-card">
              <h6>Total Payout Balance</h6>
              <p>₹ {TotalAPI_Data?.total_payout_balance || 0}</p>
            </div>
            <div className="info-card">
              <h6>Online Payout Balance</h6>
              <p>₹ {TotalAPI_Data?.total_online_payout_balance || 0}</p>
            </div>
            <div className="info-card">
              <h6>COD Payout Balance</h6>
              <p>₹ {TotalAPI_Data?.total_cod_payout_balance || 0}</p>
            </div>
          </div> */}

          {/* Commission Amount Section */}
          <div className="section" style={{ backgroundColor: "#f8bbd0" }}>
            <h4>Commission Amount</h4>
            <div className="info-card">
              <h6>Total Commission Amount</h6>
              <p>₹ {TotalAPI_Data?.total_commition_amount || 0}</p>
            </div>
            <div className="info-card">
              <h6>Online Commission Amount</h6>
              <p>₹ {TotalAPI_Data?.total_online_commition_amount || 0}</p>
            </div>
            <div className="info-card">
              <h6>COD Commission Amount</h6>
              <p>₹ {TotalAPI_Data?.total_cod_commition_amount || 0}</p>
            </div>
          </div>

          {/* Withdrawal Section */}
          <div className="section" style={{ backgroundColor: "#fff3e0" }}>
            <h4>Withdrawals</h4>
            <div className="info-card">
              <h6>Total Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_withdrawal || 0}</p>
            </div>
            <div className="info-card">
              <h6>Pending Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_pending_withdrawal || 0}</p>
            </div>
            <div className="info-card">
              <h6>Approved Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_approved_withdrawal || 0}</p>
            </div>
            <div className="info-card">
              <h6>Rejected Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_rejected_withdrawal || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for styling */}
      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          padding: 10px;
        }

        .section {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
        }

        .info-card {
          margin-bottom: 10px;
          padding: 10px;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          text-align: center;
        }

        .info-card h6 {
          margin: 0;
          font-weight: normal;
          color: #333;
        }

        .info-card p {
          margin: 5px 0 0;
          font-size: 1.1rem;
          color: #555;
        }

        h4 {
          margin-bottom: 10px;
          color: #555;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
