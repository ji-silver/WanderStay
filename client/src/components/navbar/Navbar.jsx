import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">WanderStay</span>
        </Link>
        {user ? (
          <div className="userModal">
            <button
              onClick={() => setOpenModal(!openModal)}
              className="navUserButton"
            >
              {user.username.charAt(0)}
            </button>
            {openModal && (
              <ul className="userUl">
                <li className="userLi">
                  <Link
                    to="/mypage"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <span>
                      <FontAwesomeIcon icon={faUser} className="navIcon" />
                      회원 정보 수정
                    </span>
                  </Link>
                </li>
                <li onClick={handleClick} className="userLi">
                  <span>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="navIcon"
                    />
                    로그아웃
                  </span>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="navItems">
            <button>회원가입</button>
            <Link to="/login">
              <button>로그인</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
