import React from "react";
import { useState } from "react";
import Sidebar from "../components/adminSidebar";
import Home from "../pages/admin/dashboard";
import Platform from "../pages/admin/platform";
import "./style/adminStyles.css";

const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [path, setPath] = useState("Dashboard");
  const showSideBar = (_sidebar) => {
    setSidebar(_sidebar);
  };

  function handleClick(_path) {
    setPath(_path);
  }

  const getPage = () => {
    switch (path) {
      case "Dashboard":
        return <Home />;
        break;
      case "Etsy":
        return <Platform />;
        break;
      default:
        return <Home />;
        break;
    }
  };

  return (
    <div>
      <Sidebar changePath={handleClick} slide={showSideBar} path={path} />
      <div
        className={
          sidebar ? "admin-container-active pb-5" : "admin-container pb-5"
        }
      >
        {/* {path === "Dashboard" ? <Home /> : <Platform title={path} />} */}

        {getPage()}
      </div>
    </div>
  );
};

export default AdminLayout;
