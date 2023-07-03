import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="adminTitle">관리자 페이지</span>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">WanderStay</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">사이트 관리</p>
          <li>
            <DashboardIcon className="icon" />
            <span>대시보드</span>
          </li>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>회원관리</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>숙소관리</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <HotelIcon className="icon" />
              <span>객실관리</span>
            </li>
          </Link>
          <li>
            <LogoutIcon className="icon" />
            <span>로그아웃</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
