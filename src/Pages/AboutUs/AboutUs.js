import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import AboutUsText from "./AboutUsText/AboutUsText";

const AboutUs = () => {
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
        console.log("sessionStorage value updated:", parsedValue); // Log the updated value
      }
    };

    const intervalId = setInterval(checksessionStorage, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [value]);

  useEffect(() => {
    console.log("Component updated, current value:", value);
  }, [value]);

  return (
    <>
      {console.log("After", value)}
      <div
        className={`blog-container ${
          value ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <AboutUsText />
      </div>
    </>
  );
};

export default AboutUs;
