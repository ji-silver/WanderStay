import React, { useEffect, useState } from "react";
import "./info.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { userInputs, hotelInputs, roomInputs } from "../../formsource";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Info = () => {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  // '/' 기준으로 두번째 오는 글자를 path로 정하기
  const path = location.pathname.split("/")[1];
  const { id } = location.state.params;
  // hotels는 뒤에 find 경로가 붙어야 함
  const { data } = useFetch(
    `/${path}${path === "hotels" ? "/find" : ""}/${id}`
  );
  const inputs =
    path === "users"
      ? userInputs
      : path === "hotels"
      ? hotelInputs
      : path === "rooms"
      ? roomInputs
      : null;

  const handleChange = (e) => {
    let { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.put(`/${path}/${id}`, info);
    alert("수정했습니다.");
    navigate(`/${path}`);
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="info">
      <Sidebar />
      <div className="infoContainer">
        <div>
          <h1>수정하기</h1>
        </div>
        <div className="right">
          <form>
            {inputs.map((input) => {
              return (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    defaultValue={data[input.id]}
                  />
                </div>
              );
            })}
            <button onClick={handleClick}>저장</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Info;
