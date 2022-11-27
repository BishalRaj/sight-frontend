import React, { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./style/admin-navbar.css";

function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => {
    setSidebar(!sidebar);
    props.slide(!sidebar);
  };
  const navigate = useNavigate();

  return (
    <IconContext.Provider value={{ color: "green" }}>
      <div className="a-navbar shadow" style={{ fontSize: "2rem" }}>
        <Link className="a-menu-bars">
          <FaBars onClick={showSideBar} />
        </Link>
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
              localStorage.removeItem("user");
              navigate("/");
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
