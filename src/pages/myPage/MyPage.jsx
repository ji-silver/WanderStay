import React, { createContext, useContext, useEffect, useState } from "react";
import "./myPage.scss";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handlePhone } from "../../utils/CommonFunction";

const MyPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);
  const [errorMessage, setErrorMessage] = useState("");
  const [updateUser, setUpdateUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (data) {
      setUpdateUser({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: "",
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === "phone") {
      value = handlePhone(value);
    }
    setUpdateUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async () => {
    if (
      updateUser.username === "" ||
      updateUser.email === "" ||
      updateUser.phone === "" ||
      updateUser.password === ""
    ) {
      setErrorMessage("필드를 모두 입력해주세요.");
      return;
    }
    try {
      const res = await axios.put(`/users/${user._id}`, updateUser);
      alert("수정되었습니다.");
      dispatch({ type: "UPDATE_USER", payload: updateUser });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mContainer">
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="mLogo">
              <span>회원 정보 수정</span>
            </div>
            <input
              type="text"
              placeholder="이름"
              id="username"
              value={updateUser.username}
              onChange={handleChange}
            ></input>
            <input
              type="text"
              placeholder="이메일"
              id="email"
              value={updateUser.email}
              onChange={handleChange}
            ></input>
            <input
              type="text"
              placeholder="휴대폰 번호"
              id="phone"
              value={updateUser.phone}
              onChange={handleChange}
            ></input>
            <input
              type="password"
              placeholder="비밀번호"
              id="password"
              onChange={handleChange}
            />
            <button onClick={handleClick}>수정하기</button>
            <p className="reError">
              {errorMessage && <span>{errorMessage}</span>}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;
