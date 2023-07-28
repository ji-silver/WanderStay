import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./newRoom.scss";
import { roomInputs } from "../../formsource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const navigate = useNavigate();
  const { data } = useFetch("/hotels");
  const [hotelId, setHotelId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [info, setInfo] = useState({
    title: "",
    desc: "",
    maxPeople: "",
    price: "",
  });

  const handleChange = (e) => {
    let { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (info.title === "" || info.maxPeople === "" || info.price === "") {
      setErrorMessage("필드를 모두 입력해주세요.");
      return;
    }

    // 객실번호를 쉼표로 구분해서 분할하고 배열을 map으로 돌려서 객실 번호 앞에 'number:' 문자열 삽입 후 객체로 반환
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      alert("객실을 추가하였습니다.");
      navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="roomTop">
          <h1>객실 추가하기</h1>
        </div>
        <form>
          {roomInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                onChange={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                id={input.id}
                value={info[input.id]}
              />
            </div>
          ))}
          <div className="formInput">
            <label>객실</label>
            <textarea
              onChange={(e) => setRooms(e.target.value)}
              placeholder="201, 202"
              cols="30"
            />
          </div>
          <div className="formInput">
            <label>숙소 선택</label>
            <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
              {data &&
                data.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>
          {errorMessage && <span>{errorMessage}</span>}
          <button onClick={handleClick}>저장</button>
        </form>
      </div>
    </div>
  );
};

export default NewRoom;
