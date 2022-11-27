import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/adminSidebar";
import Home from "../pages/admin/dashboard";
import Platform from "../pages/admin/platform";
import "./style/adminStyles.css";
import auth from "../services/auth.service";

const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [path, setPath] = useState("Dashboard");
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  const showSideBar = (_sidebar) => {
    setSidebar(_sidebar);
  };

  useEffect(() => {
    authenticate();
  }, []);

  function handleClick(_path) {
    setPath(_path);
  }
  const authenticate = async () => {
    let isActive_ = await auth.isActive();
    // console.log(isActive_.token.userID);
    if (
      isActive_ == null ||
      isActive_ == undefined ||
      isActive_.username == null ||
      isActive_.username == undefined
    ) {
      logout();
      return;
    }

    setName(isActive_.name);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
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
      <Sidebar
        changePath={handleClick}
        slide={showSideBar}
        path={path}
        logout={logout}
        name={name}
      />
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
