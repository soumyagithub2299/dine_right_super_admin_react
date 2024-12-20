import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/scrollToTop/ScrollToTop";
import InternetChecker from "./utils/InternetChecker/InternetChecker";
import Navbar from "./Template/Navbar";
import Login from "./Pages/Credentials/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Layout from "./Template/LayoutMain/LayoutMain/Layout";
import EmailModal from "./Pages/Credentials/Login/EmailModal";
import OtpModal from "./Pages/Credentials/Login/OtpModal";
import Payment from "./Pages/Payment/Payment";
import Restaurant from "./Pages/Restaurant/restaurant";
import Users from "./Pages/Users/Users";
import HomePageBannerImg from "./Pages/HomePageBannerImg/HomePageBannerImg";
import CoursesImg from "./Pages/CoursesImg/CoursesImg";
import CuisinesImg from "./Pages/CuisinesImg/CuisinesImg";
import BlogTemplate from "./Pages/Blog/BlogTemplate";
import NewSignUps from "./Pages/NewSignUps/NewSignUps";
import SettleMents from "./Pages/SettleMents/SettleMents";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isSuperAdminLoggedIn");
    const encryptedToken = sessionStorage.getItem(
      "superAdminTokenDineRight"
    );

    if (isLoggedIn === "true" && encryptedToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("isDineRightUserLoggedIn");
    sessionStorage.removeItem("encryptedTokenForDineRightUser");
  };

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Move the Router down here so useLocation works correctly
  return (
    <BrowserRouter>
      <AppContent
        isOffline={isOffline}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        loggedIn={loggedIn}
      />
    </BrowserRouter>
  );
}

function AppContent({ isOffline, loggedIn }) {
  const location = useLocation();

  // Define the layout paths where the Navbar should be hidden
  const isLayoutRoute = [
    "/dashboard",
    "/users",
    "/payment",
    "/reports",
    "/commission",
    "/restaurant",
    "/homePage-bannerImg",
    "/courses-img",
    "/cuisines-img",
    "/blog"
  ].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {/* Conditionally render the Navbar */}
      {!isLayoutRoute && <Navbar />}
      {isOffline && <InternetChecker />}

      <Routes>
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Login />} />
        <Route path="/email-modal" element={<EmailModal />} />
        <Route path="/OTPmodal" element={<OtpModal />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/users" element={<Users/>} />

          <Route path="/settlements" element={<SettleMents/>} />



          <Route path="/new_signups" element={<NewSignUps />} />
          <Route path="/homePage-bannerImg" element={<HomePageBannerImg/>} />
          <Route path="/courses-img" element={<CoursesImg/>} />
          <Route path="/cuisines-img" element={<CuisinesImg/>} />
          <Route path="/blog" element={<BlogTemplate/>} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
