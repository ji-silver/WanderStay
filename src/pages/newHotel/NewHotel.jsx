import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ImageIcon from "@mui/icons-material/Image";
import "./newHotel.scss";
import { hotelInputs } from "../../formsource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const { data } = useFetch("/rooms");
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    type: "호텔",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    cheapestPrice: "",
  });

  const handleChange = (e) => {
    let { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  // 클릭 시 객실 선택
  // selectedOptions은 선택된 option 객체를 알 수 있음 => option의 id값을 배열로 반환받고 rooms로 상태 관리하기
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleImageUpload = async (files) => {
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/jisilver/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      return list;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let newHotel = { ...info, rooms, featured: isChecked };
    if (files) {
      const imageUrl = await handleImageUpload(files);
      if (imageUrl) {
        newHotel = { ...newHotel, photos: imageUrl };
      }
    }

    if (
      info.name === "" ||
      info.type === "" ||
      info.distance === "" ||
      info.title === "" ||
      info.desc === "" ||
      info.cheapestPrice === ""
    ) {
      setErrorMessage("필드를 모두 입력해주세요.");
      return;
    }

    try {
      await axios.post("/hotels", newHotel);
      alert("숙소를 추가하였습니다.");
      navigate("/hotels");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div>
          <h1>숙소 추가하기</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formImageInput">
                <label htmlFor="file">
                  <div className="imageBtn">
                    <ImageIcon className="icon" />
                    이미지 업로드
                  </div>
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {hotelInputs.map((input) => {
                return (
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
                );
              })}
              <div className="formInput">
                <label>숙소 타입</label>
                <select id="type" onChange={handleChange}>
                  <option value="호텔">호텔</option>
                  <option value="모텔">모텔</option>
                  <option value="리조트">리조트</option>
                  <option value="펜션">펜션</option>
                  <option value="글램핑">글램핑</option>
                </select>
              </div>
              <div className="formInput">
                <label>숙소 추천 여부</label>
                <input
                  type="checkbox"
                  onChange={handleToggleChange}
                  id="featured"
                  className="toggleInput"
                  checked={isChecked}
                />
                <label for="featured" className="togglLabel">
                  Toggle
                </label>
              </div>
              <div className="selectRooms">
                <label>객실</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
                </select>
              </div>
              {errorMessage && <span>{errorMessage}</span>}
              <button onClick={handleClick}>저장</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
