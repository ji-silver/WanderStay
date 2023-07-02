import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handlePhone } from "../../utils/CommonFunction";

import "./register.scss";
import axios from "axios";

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [serverErr, setserverErr] = useState("");

  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === "phone") {
      value = handlePhone(value);
    }
    setNewUser((prev) => ({ ...prev, [id]: value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      newUser.username === "" ||
      newUser.email === "" ||
      newUser.phone === "" ||
      newUser.password === ""
    ) {
      setErrorMessage("필드를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post("/auth/register", newUser);
      alert("회원가입 되었습니다.");
      navigate("/login");
    } catch (err) {
      setserverErr("가입되어 있는 이름 또는 이메일입니다.");
    }
  };

  return (
    <div>
      <div className="reContainer">
        <div className="reLogo">
          <span>WanderStay</span>
        </div>
        <input
          type="text"
          placeholder="이름"
          id="username"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="이메일"
          id="email"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="휴대폰 번호"
          id="phone"
          value={newUser.phone}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="비밀번호"
          id="password"
          onChange={handleChange}
        ></input>
        <button onClick={handleClick}>회원가입</button>
        <p className="reError">
          {(errorMessage || serverErr) && (
            <>
              {errorMessage && <span>{errorMessage}</span>}
              {serverErr && <span>{serverErr}</span>}
            </>
          )}
        </p>
        <p className="lDesc">
          이미 계정이 있으신가요?
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>로그인</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
