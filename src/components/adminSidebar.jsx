import React, { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./style/admin-navbar.css";

function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => {
    setSidebar(!sidebar);
    props.slide(!sidebar);
  };

  return (
    <IconContext.Provider value={{ color: "green" }}>
      <div className="a-navbar shadow d-flex align-items-center justify-content-between">
        <Link className="a-menu-bars" style={{ fontSize: "2rem" }}>
          <FaBars onClick={showSideBar} />
        </Link>
        <div className="mx-5 px-5 d-flex align-items-center justify-content-center">
          <span
            style={{
              height: "50px",
              width: "50px",
            }}
            className="my-auto shadow-lg rounded-circle p-2 d-flex align-item-center justify-content-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/0/93.png"
              alt=""
              className="w-100"
            />
          </span>
          <p className="my-auto fw-bold text-light mx-2">{props.name}</p>
        </div>
      </div>
      <nav className={sidebar ? "a-nav-menu active shadow" : "a-nav-menu"}>
        <ul className="a-nav-menu-items">
          <li className="a-navbar-toggle" onClick={showSideBar}>
            <Link className="a-menu-bars">
              <AiOutlineClose />
            </Link>
          </li>

          {SidebarData.map((data, index) => {
            return (
              <li className={data.cName} key={index}>
                <Link
                  onClick={() => props.changePath(data.title)}
                  to={data.path}
                  style={{
                    backgroundColor: data.title === props.path ? "#28DEC0" : "",
                  }}
                >
                  {data.icon}
                  <span>{data.title}</span>
                </Link>
              </li>
            );
          })}

          <li
            className="a-nav-text"
            onClick={() => {
              props.logout();
            }}
          >
            <Link>
              <AiOutlineLogout />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;
