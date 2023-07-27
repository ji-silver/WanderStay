import { useContext } from "react";
import "./sidebar.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");

    if (confirmed) {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="adminTitle">관리자 페이지</span>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <span className="logo">WanderStay</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">사이트 관리</p>
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
          <li onClick={handleClick}>
            <LogoutIcon className="icon" />
            <span>로그아웃</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
