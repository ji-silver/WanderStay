import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">WanderStay</span>
        <div className="navItems">
          <button className="navButton">회원가입</button>
          <button className="navButton">로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
