import React from "react";
import {
  AiFillDashboard,
  AiFillFileExcel,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaEtsy, FaUps } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <AiFillDashboard />,
    cName: "a-nav-text",
  },
  {
    title: "Etsy",
    icon: <FaEtsy />,
    cName: "a-nav-text",
  },
  {
    title: "Dataset",
    icon: <AiFillFileExcel />,
    cName: "a-nav-text",
  },
  {
    title: "UPS",
    icon: <FaUps />,
    cName: "a-nav-text",
  },
  // {
  //   title: "Logout",
  //   icon: <AiOutlineLogout />,
  //   cName: "a-nav-text",
  // },
];
