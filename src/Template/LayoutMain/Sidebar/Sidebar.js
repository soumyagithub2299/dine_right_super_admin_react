import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for routing
import "./Sidebar.css"; // Assuming sidebar styles are in Sidebar.css
import { HiOutlineHome } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { TbNotebook } from "react-icons/tb";
import { IoPeopleOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiCookingPot } from "react-icons/pi";
import { MdOutlineFolder } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TbGraph } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { PiCircleDashedDuotone } from "react-icons/pi";
import { TfiLayoutSlider } from "react-icons/tfi";
import { CiBowlNoodles } from "react-icons/ci";
import { BsBlockquoteRight } from "react-icons/bs";

import { AiOutlineTransaction } from "react-icons/ai";
import { FaRegNewspaper } from "react-icons/fa"; // Icon for Blog
import { RiFilePaper2Line } from "react-icons/ri"; // Icon for Privacy Policy and Cancellation Policy
import { GiCook } from "react-icons/gi"; // Icon for Cuisines
import { FiClipboard } from "react-icons/fi"; // Icon for About Us

const Sidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState(""); // State to track the active item
  const location = useLocation(); // Get the current location

  useEffect(() => {
    console.log("Component updated, current value:", isOpen);
  }, [isOpen]);

  // Set active item based on the current path
  useEffect(() => {
    setActiveItem(location.pathname); // Set the active item based on current path
  }, [location]);

  // Function to set the active item when clicked
  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-menu-container">
        {/* Sidebar Menu */}
        <ul className="sidebar-menu">
          <Link to="/dashboard">
            <li
              className={`menu-item ${
                activeItem === "/dashboard" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/dashboard")}
            >
              <HiOutlineHome />
              <span className="hover_clr">Dashboard</span>
            </li>
          </Link>

          <Link to="/restaurant">
            <li
              className={`menu-item ${
                activeItem === "/restaurant" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/restaurant")}
            >
              <PiCookingPot />
              <span>Restaurant</span>
            </li>
          </Link>

          <Link to="/users">
            <li
              className={`menu-item ${
                activeItem === "/users" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/users")}
            >
              <IoPeopleOutline />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/settlements">
            <li
              className={`menu-item ${
                activeItem === "/settlements" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/settlements")}
            >
              <AiOutlineTransaction />
              <span>Settlements</span>
            </li>
          </Link>

          <Link to="/new_signups">
            <li
              className={`menu-item ${
                activeItem === "/new_signups" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/new_signups")}
            >
              <LiaMoneyBillWaveSolid />
              <span>New Signup Resto</span>
            </li>
          </Link>

          <Link to="/blog">
            <li
              className={`menu-item ${
                activeItem === "/blog" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/blog")}
            >
              <FaRegNewspaper />
              <span>Blog</span>
            </li>
          </Link>

          <Link to="/banner">
            <li
              className={`menu-item ${
                activeItem === "/banner" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/banner")}
            >
              <RiFilePaper2Line />
              <span>Banner</span>
            </li>
          </Link>

          <Link to="/courses">
            <li
              className={`menu-item ${
                activeItem === "/courses" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/courses")}
            >
              <GiCook />
              <span>Courses</span>
            </li>
          </Link>

          <Link to="/cuisines">
            <li
              className={`menu-item ${
                activeItem === "/cuisines" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/cuisines")}
            >
              <CiBowlNoodles />
              <span>Cuisines</span>
            </li>
          </Link>

          <Link to="/privacy-policy">
            <li
              className={`menu-item ${
                activeItem === "/privacy-policy" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/privacy-policy")}
            >
              <RiFilePaper2Line />
              <span>Privacy Policy</span>
            </li>
          </Link>

          <Link to="/cancellation-policy">
            <li
              className={`menu-item ${
                activeItem === "/cancellation-policy" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/cancellation-policy")}
            >
              <RiFilePaper2Line />
              <span>Cancellation Policy</span>
            </li>
          </Link>

          <Link to="/about-us">
            <li
              className={`menu-item ${
                activeItem === "/about-us" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/about-us")}
            >
              <FiClipboard />
              <span>About Us</span>
            </li>
          </Link>
          <Link to="/help-center">
            <li
              className={`menu-item ${
                activeItem === "/help-center" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/help-center")}
            >
              <FiClipboard />
              <span>Help Center</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
