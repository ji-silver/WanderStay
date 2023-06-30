import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      newUser.username === "" ||
      newUser.email === "" ||
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
      console.log(err);
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
          type="password"
          placeholder="비밀번호"
          id="password"
          onChange={handleChange}
        ></input>
        <button onClick={handleClick}>회원가입</button>
        <p className="reError">{errorMessage && <span>{errorMessage}</span>}</p>
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
