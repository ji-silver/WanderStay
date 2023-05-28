import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">WanderStay</span>
        </Link>
        <div className="navItems">
          <button className="navButton">회원가입</button>
          <button className="navButton">로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
