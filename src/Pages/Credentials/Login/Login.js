import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      toast.error("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      isValid = false;
    }

    if (!password) {
      toast.error("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };



  

  const handleSignIn = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);

      const body = {
        superadmin_email: email,
        superadmin_password: password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_SUPER_ADMIN_BASE_API_URL}/api/auth/superadminlogin`,
        body
      );

      setLoading(false);

      if (response?.data?.response === true) {
        setEmail("");
        setPassword("");

        sessionStorage.clear();

        sessionStorage.setItem(
          "TokenForSuperAdminOfDineRight",
          response.data?.token
        );
        sessionStorage.setItem(
          "IDofSuperAdminOfDineRight",
          response.data?.superadmin_id
        );
        sessionStorage.setItem("isSuperAdminLoggedInOfDineRight", true);

        toast.success(response.data.success_msg || "Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(
          response.data.error_msg || "Login failed. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred. Invalid email or password. Please try again."
      );
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div style={{ height: "60vh" }}>
        <div className="login-container mt-4">
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <h2
              style={{
                cursor:"default",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                fontSize: "24px",
                background:
                  "linear-gradient(90deg, #fffacd, #ffebcd)" /* Light yellow gradient */,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" /* Soft shadow */,
                padding: "10px 20px" /* Adds space around text */,
                borderRadius: "8px" /* Rounded corners */,
              }}
            >
              {/* <i className="fas fa-user" style={{ 
      fontSize: "24px", 
      position: "absolute", 
      left: "0" 
    }}></i>  */}
              <span style={{ textAlign: "center" }}>Super Admin Login</span>
              {/* <i className="fas fa-user" style={{ 
      fontSize: "24px", 
      position: "absolute", 
      right: "0" 
    }}></i> */}
            </h2>

            <div className="mt-4">
              <label htmlFor="email" className="login-label ">
                Email  <span className="text-danger">*</span>
              </label>

              <input
                type="email"
                id="email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-0">
              <label htmlFor="password" className="login-label">
                Password  <span className="text-danger">*</span>
              </label>

              <input
                type="password"
                id="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-btn-container">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
