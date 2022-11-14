import React from "react";
import { useState } from "react";
import Sidebar from "../components/adminSidebar";
import "./style/adminStyles.css";

const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [path, setPath] = useState("Home");
  const showSideBar = (_sidebar) => {
    setSidebar(_sidebar);
  };

  function handleClick(_path) {
    setPath(_path);
  }
  return (
    <div>
      <Sidebar changePath={handleClick} slide={showSideBar} />
      <div
        className={
          sidebar ? "admin-container-active pb-5" : "admin-container pb-5"
        }
      >
        {/* {path === "About" ? (
          <About />
        ) : path === "Resume" ? (
          <Resume />
        ) : path === "Skills" ? (
          <Skills />
        ) : (
          <Home />
        )} */}
      </div>
    </div>
  );
};

export default AdminLayout;
