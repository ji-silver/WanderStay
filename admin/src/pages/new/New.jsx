import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ImageIcon from "@mui/icons-material/Image";
import {
  handlePhone,
  validateEmail,
  validatePassword,
} from "../../utils/CommonFunction";
import axios from "axios";
import "./new.scss";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // 필드에 입력 시 info 상태 업데이트, id가 키 - value가 값
  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === "phone") {
      value = handlePhone(value);
    }
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  // cloudinary API를 사용해서 이미지를 클라우드에 저장하고 url 받아오기
  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/jisilver/image/upload",
        data
      );
      return uploadRes.data.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // 회원을 추가할 때 handleImageUpload 함수를 호출해서 file을 넘기기
  // 이미지 url을 받아오면 db에 저장 (없으면 저장 x)
  const handleClick = async (e) => {
    e.preventDefault();
    let newUser = { ...info };
    if (file) {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        newUser.img = imageUrl;
      }
    }

    if (
      info.username === "" ||
      info.email === "" ||
      info.phone === "" ||
      info.password === ""
    ) {
      setErrorMessage("필드를 모두 입력해주세요.");
      return;
    }

    if (!validateEmail(newUser.email)) {
      setErrorMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!validatePassword(newUser.password)) {
      setErrorMessage("비밀번호는 8자리 이상 영문자, 숫자를 포함해야 합니다.");
      return;
    }

    try {
      await axios.post("/auth/register", newUser);
      alert("회원을 추가하였습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div>
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => {
                return (
                  <div className="formInput" key={inputs.id}>
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
              {errorMessage && <span>{errorMessage}</span>}
              <button onClick={handleClick}>저장</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
